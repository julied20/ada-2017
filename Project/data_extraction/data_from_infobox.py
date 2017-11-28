import re
import numpy as np

from bs4 import BeautifulSoup


def get_ID(infobox):
    """Get ID (ISO 3166 code) of the country"""

    ID = infobox.find(text = re.compile("ISO 3166 code"))

    if ID is not None:
        return ID.find_next('a').text
    else:
        return False


def get_size(infobox):
    """Get size of the country"""

    area = infobox.find("th", text="Area")

    if area:
        size = area.parent.next_sibling.next_sibling.td.text.split("\xa0")[0]

        # Size cleaning
        if '–' in size: size = size.split("–")[0]
        if '[' in size: size = size.split("[")[0]
        if ',' in size: size = size.replace(",", "")
        if '.' in size: size = size.split(".")[0]
        if ' ' in size: size = size.split(" ")[0]
        if len(size) == 0: size = 0

        return int(size)

    else:
        return 0


def get_date_cleaned(independ_date):
    """Transforme the independence date from wikipedia to a usable date"""

    months = {'January': '01', 'February': '02', 'March': '03',
             'April': '04', 'May': '05', 'June': '06',  'July': '07',
             'August': '08', 'September': '09', 'October': '10',
             'November': '11', 'December': '12'}

    if independ_date:
        if not type(independ_date) == 'str':
            independ_date_tmp = independ_date.text.split()
        else:
            independ_date_tmp = independ_date.split()

        if len(independ_date_tmp) >= 3:
            if independ_date_tmp[1] in months:
                day = independ_date_tmp[0].split('–')[0]
                month = months[independ_date_tmp[1]]
                year = independ_date_tmp[2].split('[')[0]
                return day, month, year

            elif independ_date_tmp[0] in months:
                day = independ_date_tmp[1].split(',')[0].split('–')[0]
                month = months[independ_date_tmp[0]]
                year = independ_date_tmp[2].split('[')[0]
                return day, month, year

    return np.nan, np.nan, np.nan


def get_colonizer_and_decoloniz_date(infobox, colonizer, colonizer_countries):
    """Get the colonizer country and the date of independence of a ex-colony"""

    new_colonizer, indep_day, indep_month, indep_year = np.nan, np.nan, np.nan, np.nan

    if infobox:
        formation = infobox.find_next(text = re.compile("Formation"))

        if formation:
            independence = formation.find_next(text = re.compile("independence"))

            if independence:
                if independence.find_next("a"): new_colonizer = independence.find_next("a").text
                if independence.find_next("td"): indep_day, indep_month, indep_year = get_date_cleaned(independence.find_next("td"))

            else:
                independence = formation.find_next(text = re.compile("Independence"))

                if independence:
                    new_colonizer = independence.find_next("a").text
                    indep_day, indep_month, indep_year = get_date_cleaned(independence.find_next("td"))
                else:
                    indep_day, indep_month, indep_year = get_date_cleaned(formation.find_next("td"))

        else:
            independence = infobox.find_next(text = re.compile("Independence"))

            if independence:
                new_colonizer = independence.find_next("a").text
                indep_day, indep_month, indep_year = get_date_cleaned(independence.find_next("td"))

                independence_next = independence.find_next(text = re.compile("Independence"))

                if independence_next:
                    indep_day, indep_month, indep_year = get_date_cleaned(independence_next.find_next("td"))
                else:
                    independence_next = independence.find_next(text = re.compile("Declared"))

                    if independence_next:
                        indep_day, indep_month, indep_year = get_date_cleaned(independence_next.find_next("td"))

        if independence or formation:
            if new_colonizer in colonizer_countries:
                return new_colonizer, indep_day, indep_month, indep_year
            else:
                return colonizer, indep_day, indep_month, indep_year
        else:
            return np.nan, np.nan, np.nan, np.nan


def get_today_part_of(infobox):
    """Get all new countries formed by a ex-colony"""

    new_countries, URL, i = [], [], 0

    today_part_of = infobox.find("b", text="Today part of")

    if today_part_of:
        today_part_of = today_part_of.find_all_next("a")

        # Naviguate in all "today part of" country
        for i in range(len(today_part_of)):
            if is_a_country(today_part_of[i]) and today_part_of[i].has_attr('href'):
                new_countries.append(today_part_of[i].text)
                URL.append(today_part_of[i]['href'])

        return new_countries, URL

    else:
        return False, False


def get_succeeded_by(infobox):
    """Get new countries who succeed to a ex-colony"""

    succeeded_by = infobox.find("b", text="Succeeded by")

    if succeeded_by:
        succeeded_by = succeeded_by.parent.parent.next_sibling.next_sibling

        new_country = succeeded_by.find(style="border:0; padding:0; vertical-align:middle; text-align:right;").text
        URL = succeeded_by.find(style="border:0; padding:0; vertical-align:middle; text-align:right;").a['href']

        return new_country, URL

    else:
        return False, False

def is_a_country(info):
    """ Check if the country is realy a country"""

    if info.has_attr('href'):
        if info['href'].split('/')[0] is '':
            return True
        else:
            return False
    else:
        return False
