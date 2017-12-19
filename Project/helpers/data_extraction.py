import pandas as pd
import requests
import re
import numpy as np

from bs4 import BeautifulSoup
from helpers.data_from_infobox import *

def get_wikipedia_dataframe():
    colonization_df = pd.DataFrame(columns=['colonized_country', 'ID', 'Day', 'Month', 'Year', 'colonizer_country', "URL"])

    URL_QS = 'https://en.wikipedia.org/wiki/List_of_former_European_colonies'
    r = requests.get(URL_QS)
    soup = BeautifulSoup(r.text, 'lxml')

    # Find all colonizer coutries
    colonizer_countries = get_colonizer_countries(soup)
    # Find all continents
    regions = get_regions(soup)

    for colonizer_country in colonizer_countries:
        print(colonizer_country, "...")

        # Find all mention of colonizer coutries
        colonizer_index = soup.find_all("p", text=colonizer_country)

        for i in range (len(colonizer_index)):
            colonized_countries = colonizer_index[i].next_sibling.next_sibling('a')

            for colonized_country in colonized_countries:
                if colonized_country.text not in regions and len(colonized_country.attrs) < 3:
                    check_country(colonization_df, colonized_country.text, colonizer_country, colonizer_countries, colonized_country['href'], 1)

    # Clean the dataframe
    colonization_df_cleaned = get_dataframe_cleaned(colonization_df)

    # Dataframe Saving
    colonization_df_cleaned.to_csv("datasets/colonies_wikipedia.csv")

    return colonization_df_cleaned


def get_colonizer_countries(soup):
    """ Find all colonizer countries in the wikipedia webpage"""
    colonizer_countries = []

    # To find the name of all colonized_country of Europe, we take care about 2 things :
    #  - If there is more than 2 spaces in the text -> isn't a country
    #  - If there is less than 2 letters in the text -> isn't a country

    for country in soup.findAll('p'):
        nb_space = sum(c.isspace() for c in country.text)

        if country.text not in colonizer_countries and nb_space < 3 and len(country.text) > 2:
            colonizer_countries.append(country.text)

    # List Cleaning
    colonizer_countries = [country.replace('\n', '') for country in colonizer_countries]

    return colonizer_countries


def get_regions(soup):
    """ Find all continents in the wikipedia webpage"""
    regions = []

    for region in soup.find("ul").findAll('li'):
        regions.append(region.text[2:])

    del regions[-1], regions[-1]

    return regions


def get_dataframe_cleaned(df):
    """ Clean the colonized countries dataframe"""
    # Dataset cleaning
    colonization_df_cleaned = df.replace("Britain", "United Kingdom")

    # Add missing countries due to a not homogenous infobox in wikipedia page
    colonization_df_cleaned.loc[len(colonization_df_cleaned)+1] = ['Syria', "SY", "24", "10", "1945", "France", "/wiki/Syria"]
    colonization_df_cleaned.loc[len(colonization_df_cleaned)+1] = ['Niger', "NE", "03", "08", "1960", "France", "/wiki/Niger"]
    colonization_df_cleaned.loc[len(colonization_df_cleaned)+1] = ['Lebanon', "LB", "24", "10", "1945", "France", "/wiki/Lebanon"]

    colonization_df_cleaned.to_csv("datasets/colonies_wikipedia_TEST.csv")
    
    # Change decolonization date
    change_date(colonization_df_cleaned, "Namibia", "31", "05", "1910")
    change_date(colonization_df_cleaned, "Philippines", "12", "06", "1898")
    change_date(colonization_df_cleaned, "Ukraine", "24", "08", "1991")
    change_date(colonization_df_cleaned, "Iceland", "17", "06", "1944")
    change_date(colonization_df_cleaned, "Kuwait", "19", "06", "1961")
    change_date(colonization_df_cleaned, "Eritrea", "01", "06", "1941")
    change_date(colonization_df_cleaned, "Ethiopia", "05", "05", "1941")

    # Small correction of some countries
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Moldova', 'Year'] = "1991"

    # Change name 
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'United States', 'colonized_country'] = 'United States of America'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'The Gambia', 'colonized_country'] = 'Gambia'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Cisplatina (Uruguay)', 'colonized_country'] = 'Uruguay'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Republic of Tunisia', 'colonized_country'] = 'Tunisia'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Independent State of Papua New Guinea', 'colonized_country'] = 'Papua New Guinea'
       
    # Remove countries
    colonization_df_cleaned = colonization_df_cleaned[colonization_df_cleaned['colonized_country'] != 'Iran']
    colonization_df_cleaned = colonization_df_cleaned[colonization_df_cleaned['colonized_country'] != 'Taiwan']
    
    # Change colonizer
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'United States', 'colonizer_country'] = 'United Kingdom'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Brazil', 'colonizer_country'] = 'Portugal'
    colonization_df_cleaned.loc[colonization_df_cleaned['colonized_country'] == 'Bangladesh', 'colonizer_country'] = 'United Kingdom'

    return colonization_df_cleaned


def change_date(df, country, day, month, year):
    """ Change the date in the colonized countries dataframe"""
    df.loc[df['colonized_country'] == country, 'Day'] = day
    df.loc[df['colonized_country'] == country, 'Month'] = month
    df.loc[df['colonized_country'] == country, 'Year'] = year


def get_infobox(soup):
    """Get the infobox of a wikipedia page (infobox contains all important informations)."""
    infobox = soup.find("table", class_="infobox geography")
    if not infobox: infobox = soup.find("table", class_="infobox geography vcard")
    if not infobox: infobox = soup.find("table", class_="infobox geography vcard vevent")
    if not infobox: infobox = soup.find("table", class_="infobox vcard ")
    if not infobox: return False

    return infobox.extract()


def check_country(df, colonized, colonizer, colonizer_countries, URL, nb_check):
    """ Chack all informations of a country (colonizer, independance date, etc)"""

    # The checking of each colony is as follows :
    # - If a infobox (the resum on the right side) exist, we check the size. If
    #   the size is inferior than a  certain value, we does not considere this country
    #   because it is more a island or a city than a country. We also check if the
    #   colonized_country is the same at the end as the begin. And the end, we take
    #   the colonized_country juste before the independance.
    # - If a word like 'disestablished' or 'disestablishments' is found in the
    #   page, we considere that the
    #   country don't exist any more. We check if a new country was created on find
    #   the sentence "Succeeded by" in the infobox (if it extist) and repeat the
    #   checking with the new country if found

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

                    # Check if the colonized_country is not a duplicate
                    if ID and colonized and colonizer is not np.nan and len(df[df['ID']== ID]) < 1:
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
