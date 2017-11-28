import pandas as pd
import requests
import re
import numpy as np

from bs4 import BeautifulSoup
from data_extraction.data_from_infobox import *

def get_infobox(soup):
    """Get the infobox of a wikipedia page (infobox contains all important informations)."""

    infobox = soup.find("table", class_="infobox geography")
    if not infobox: infobox = soup.find("table", class_="infobox geography vcard")
    if not infobox: infobox = soup.find("table", class_="infobox geography vcard vevent")
    if not infobox: infobox = soup.find("table", class_="infobox vcard ")
    if not infobox: return False

    return infobox.extract()

def check_country(df, colonized, colonizer, colonizer_countries, URL, nb_check):

    # The checking of each colony is as follows :
    # - If a infobox (the resum on the right side) exist, we check the size. If the size is inferior than a
    #   certain value, we does not considere this country because it is more a island or a city than a country.
    #   We also check if the colonizer country is the same at the end as the begin. And the end, we take the
    #   colonizer country juste before the independance.
    # - If a word like 'disestablished' or 'disestablishments' is found in the page, we considere that the
    #   country don't exist any more. We check if a new country was created on find
    #   the sentence "Succeeded by" in the infobox (if it extist) and repeat the checking with the new
    #   country if found

    if nb_check > 4 or colonized in colonizer_countries:
        return

    URL_QS = 'https://en.wikipedia.org' + URL
    r = requests.get(URL_QS)
    soup = BeautifulSoup(r.text, 'lxml')

    infobox = get_infobox(soup)

    new_countries, new_URL = [], []

    if infobox:

        # Check if it's not a region of a country
        if not infobox.find("th", text="Country"):

            # Check if the country still exist
            if not soup(text=re.compile('disestablished')) and not soup(text=re.compile('disestablishments')):
                size = get_size(infobox)

                # If the country size is inferior to 1'500 km2, don't care of it
                if size > 1500:
                    ID = get_ID(infobox)
                    colonizer, indep_day, indep_month, indep_year = get_colonizer_and_decoloniz_date(infobox, colonizer, colonizer_countries)

                    # Check if the colonized country is not a duplicate
                    if ID and colonized and len(df[df['ID']== ID]) < 1:
                        df.loc[len(df)+1] = [colonized, ID, indep_day, indep_month, indep_year, colonizer, URL]
            else:
                # If the country don't exist anymore, check the new countries in the "today part of" channel
                new_countries, new_URL = get_today_part_of(infobox)

                if new_countries:
                    for index, country in (enumerate(new_countries)):
                        check_country(df, country, colonizer, colonizer_countries, new_URL[index], nb_check + 1)

                else:
                    # If  channel "today part of" don't exist, check the new countries in the "get succeeded by"
                    # channel
                    new_country, new_URL = get_succeeded_by(infobox)

                    if new_country:
                        check_country(df, new_country, colonizer, colonizer_countries, new_URL, nb_check + 1)
