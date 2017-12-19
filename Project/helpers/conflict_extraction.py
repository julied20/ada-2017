import pandas as pd
import numpy as np

from tqdm._tqdm_notebook import tqdm_notebook
# If error -> pip install tqdm

def get_colonization_conflicts_df():
    """ Process conflict df to obtain the cleaned pre and post colonization df """

    # Import conflict dataframe
    conflict_df = pd.read_csv('datasets/ucdp-prio-acd-171.csv')

    # Remove useless columns, useless words and useless punctuation
    conflict_df = get_cleaned_conflict_df(conflict_df)

    # Resolve issues with row where is multiple locations
    conflict_df = get_reorganized_rows_df(conflict_df)

    # Create the years/region dataset
    yr_conflict_df = get_year_regions_conflict_df(conflict_df)

    # Create the pre/post colonization conflict dataframe
    pre_colonization_conflict_df, post_colonization_conflict_df = get_pre_post_colonization_df(conflict_df)

    # Create the pre/post years/colonized_country dataset
    yc_conflict_pre_df, yc_conflict_post_df = get_year_countries_conflict_df(pre_colonization_conflict_df, post_colonization_conflict_df)

    return conflict_df, pre_colonization_conflict_df, post_colonization_conflict_df, yr_conflict_df, yc_conflict_pre_df, yc_conflict_post_df


def get_cleaned_conflict_df(df):
    """ Clean the conflict dataset (remove useless columns, remove useless words, etc...) """

    # Remove useless columns
    columns_to_drop = ['conflictid', 'sidebid', 'terr', 'startprec', 'sidea2nd',
                       'startprec2', 'epend', 'ependprec', 'gwnoa', 'gwnoa2nd',
                       'sideb2nd', 'gwnob', 'gwnob2nd', 'gwnoloc', 'version']
    df.drop(columns_to_drop, axis=1, inplace=True)

    # Remove columns
    df.replace({'Government of ': ''}, regex=True, inplace=True)

    # Remove text between parentheses
    df.location.replace({r'\([^()]+\)' : ''}, regex=True, inplace=True)

    # Remove South/North from Location (ex: South Yemen or South Korea)
    df.location.replace({'South ' : ''}, regex=True, inplace=True)
    df.location.replace({'North ' : ''}, regex=True, inplace=True)

    # Correct issue with South Africa
    df.location.replace({'Africa' : 'South Africa'}, regex=True, inplace=True)
    df.location.replace({'Central South African Republic' : 'Central African Republic'}, regex=True, inplace=True)

    # Correct issue with Congo (and DR Congo)
    df.location.replace({'Congo' : 'DR Congo'}, regex=True, inplace=True)
    df.location.replace({'DR DR' : 'DR'}, regex=True, inplace=True)

    return df


def get_reorganized_rows_df(df):
    """ When multiple location, add each location to the df"""

    # Create empty temporary dataframe
    columns = ["location", "sidea", "side b", "incomp", "year", "intensity",
               "cumint", "type", "startdate", "startdate2", "ependdate", "region"]
    df_tmp = pd.DataFrame(columns=columns)

    for index in range(len(df)):
        # Save all locations and all regions of a row
        locations = df.loc[index, 'location'].split(",")
        regions = df.loc[index, 'region'].split(",")

        if len(regions) > 1:
            pairs = [(locations[i], regions[i]) for i in range(len(locations))]

            for i, pair in enumerate(pairs):
                # Create a replicata of the row
                row_df = df.loc[index:index,]

                # Assign the new values to the replicata
                if i > 0:
                    row_df.set_value(index, 'location', pair[0][1:])
                    row_df.set_value(index, 'region', pair[1])
                else:
                    row_df.set_value(index, 'location', pair[0])
                    row_df.set_value(index, 'region', pair[1])
                # /!\ WARNING WHEN EXECUT --> HAVE TO CORRECT

                # Add the new line to the temporary df
                df_tmp = df_tmp.append(row_df)

            # Remove initial line
            df.drop(index, inplace=True)

        elif len(regions) == 1 and len(locations) > 1:
            # If multiple locations but juste one region, take only first location
            df.loc[index, 'location'] = locations[0]

    # Concatenate temporary df and existant df
    df = pd.concat([df, df_tmp]).reset_index(drop=True)

    # Columns reorganization
    df = df[columns]

    return df


def get_pre_post_colonization_df(conflict_df):
    """ Create the pre and post colonization dataframe"""

    colonized_df = pd.read_csv('datasets/colonies_wikipedia.csv')
    colonized_countries = list(colonized_df["colonized_country"])

    # Create two empty dataframe
    columns = ["location", "ID", "colonizer_country", "Indep Date", "sidea", "side b", "incomp", "year", "intensity",
               "cumint", "type", "startdate", "startdate2", "ependdate", "region"]
    pre_colonization_conflict_df = pd.DataFrame(columns=columns)
    post_colonization_conflict_df = pd.DataFrame(columns=columns)

    for index in tqdm_notebook(range(len(conflict_df))):
        country = conflict_df.loc[index, 'location']

        # Correct issue when country string had a space at the end
        if country[-1] == ' ': country = country[:-1]

        # Check if the country is a ex colony
        if country in colonized_countries:
            # Get information from colonies dataframe
            indep_year = colonized_df.loc[colonized_df['colonized_country'] == country, 'Year'].values[0]
            indep_month = colonized_df.loc[colonized_df['colonized_country'] == country, 'Month'].values[0]
            indep_day = colonized_df.loc[colonized_df['colonized_country'] == country, 'Day'].values[0]
            indep_date = str(indep_day) + "/" + str(indep_month) + "/" + str(indep_year)

            ID = colonized_df.loc[colonized_df['colonized_country'] == country, 'ID'].values[0]
            colonizer_country = colonized_df.loc[colonized_df['colonized_country'] == country, 'colonizer_country'].values[0]

            # Creation of the temporary row
            conflict_df_tmp = conflict_df.loc[index:index,]
            conflict_df_tmp.set_value(index, 'Indep Date', indep_date)
            conflict_df_tmp.set_value(index, 'ID', ID)
            conflict_df_tmp.set_value(index, 'colonizer_country', colonizer_country)

            start_year = int(conflict_df.loc[index, 'year'])

            # Check when happend the conflict (before or after independence)
            if start_year > indep_year:
                post_colonization_conflict_df = post_colonization_conflict_df.append(conflict_df_tmp)
            else:
                pre_colonization_conflict_df = pre_colonization_conflict_df.append(conflict_df_tmp)
        #else:
        #    print(country, "--> NOT EX COLONY")

    # Create general colonization dataframe
    conflict_df.to_csv("datasets/colonization_conflict_general.csv")

    # Create the post colonization dataframe
    pre_colonization_conflict_df = pre_colonization_conflict_df.reset_index(drop=True)
    pre_colonization_conflict_df = pre_colonization_conflict_df[columns]
    pre_colonization_conflict_df.to_csv("datasets/colonization_conflict_pre.csv")

    # Create the post colinzation dataframe
    post_colonization_conflict_df = post_colonization_conflict_df.reset_index(drop=True)
    post_colonization_conflict_df = post_colonization_conflict_df[columns]
    post_colonization_conflict_df.to_csv("datasets/colonization_conflict_post.csv")

    return pre_colonization_conflict_df, post_colonization_conflict_df


def get_year_regions_conflict_df(clean_conflict):
    """ Create the regions in functions of the year number of conflict dataframe """
    columns = ["Year", "Europe", "Middle East", "Asia", "Africa", "America"]
    years = np.linspace(1945, 2016, num=2016-1945+1, dtype=int)
    years = np.reshape(years, (len(years), 1))
    regions = np.zeros((len(years), 5), dtype=int)
    years_regions = np.concatenate((years,regions),axis=1)

    yr_conflict_df = pd.DataFrame(years_regions, columns=columns)
    yr_conflict_df = yr_conflict_df.set_index('Year')

    for index in range(len(clean_conflict)):
        year = clean_conflict.get_value(index,'year')
        region = clean_conflict.get_value(index,'region')

        if int(region) == 1: yr_conflict_df.set_value(year, 'Europe', yr_conflict_df.get_value(year, 'Europe')+1)
        if int(region) == 2: yr_conflict_df.set_value(year, 'Middle East', yr_conflict_df.get_value(year, 'Middle East')+1)
        if int(region) == 3: yr_conflict_df.set_value(year, 'Asia', yr_conflict_df.get_value(year, 'Asia')+1)
        if int(region) == 4: yr_conflict_df.set_value(year, 'Africa', yr_conflict_df.get_value(year, 'Africa')+1)
        if int(region) == 5: yr_conflict_df.set_value(year, 'America', yr_conflict_df.get_value(year, 'America')+1)

    yr_conflict_df.to_csv("datasets/colonization_conflict_year_regions.csv")

    return yr_conflict_df

def get_year_intensity_conflict_df(clean_conflict):
    """ Create the intensity in functions of the year number of conflict dataframe """
    columns = ["Year", "Intensity1", "Intensity2"]
    years = np.linspace(1945, 2016, num=2016-1945+1, dtype=int)
    years = np.reshape(years, (len(years), 1))
    intensity = np.zeros((len(years), 5), dtype=int)
    years_intensity = np.concatenate((years,intensity),axis=1)

    yr_conflict_df = pd.DataFrame(years_intensity, columns=columns)
    yr_conflict_df = yr_conflict_df.set_index('Year')

    for index in range(len(clean_conflict)):
        year = clean_conflict.get_value(index,'year')
        intensity = clean_conflict.get_value(index,'intensity')

        if int(intensity) == 1: yr_conflict_df.set_value(year, 'Intensity1', yr_conflict_df.get_value(year, 'Intensity1')+1)
        if int(intensity) == 2: yr_conflict_df.set_value(year, 'Intensity2', yr_conflict_df.get_value(year, 'Intensity2')+1)

    yr_conflict_df.to_csv("datasets/colonization_conflict_year_intensity.csv")

    return yr_conflict_df    

def get_continent_reason_conflict_df(clean_conflict):
    """ Create the reason in functions of the continent number of conflict dataframe """
    columns = ["Reason", "Europe", "Middle East", "Asia", "Africa", "America"]
    years = np.linspace(1945, 2016, num=2016-1945+1, dtype=int)
    years = np.reshape(years, (len(years), 1))
    incomp = np.zeros((len(years), 5), dtype=int)
    years_incomp = np.concatenate((years,incomp),axis=1)

    yr_conflict_df = pd.DataFrame(years_incomp, columns=columns)
    yr_conflict_df = yr_conflict_df.set_index('Year')

    for index in range(len(clean_conflict)):
        year = clean_conflict.get_value(index,'year')
        incomp = clean_conflict.get_value(index,'incomp')

        if int(incomp) == 1: yr_conflict_df.set_value(year, 'Europe', yr_conflict_df.get_value(year, 'Europe')+1)
        if int(incomp) == 2: yr_conflict_df.set_value(year, 'Middle East', yr_conflict_df.get_value(year, 'Middle East')+1)
        if int(incomp) == 3: yr_conflict_df.set_value(year, 'Asia', yr_conflict_df.get_value(year, 'Asia')+1)

    yr_conflict_df.to_csv("datasets/colonization_conflict_year_regions.csv")

    return yr_conflict_df    

def get_year_countries_conflict_df(pre_colonization_conflict_df, post_colonization_conflict_df):
    """ Create the pre/post decolonization countries/years conflicts dataframes """

    colonized_df = pd.read_csv('datasets/colonies_wikipedia.csv')
    colonizer_countries = list(colonized_df["colonizer_country"].value_counts().keys())

    # Creation of the dataframe
    columns = ["Year"] + colonizer_countries
    years = np.linspace(1945, 2016, num=2016-1945+1, dtype=int)
    years = np.reshape(years, (len(years), 1))
    countries = np.zeros((len(years), len(colonizer_countries)), dtype=int)
    years_countries = np.concatenate((years,countries),axis=1)

    # Computation of the dataframe
    yc_conflict_pre_df = get_yc_conflict_df(pre_colonization_conflict_df, years_countries, columns, colonizer_countries)
    yc_conflict_pre_df.to_csv("datasets/colonization_conflict_year_colon_countries_pre.csv")

    yc_conflict_post_df = get_yc_conflict_df(post_colonization_conflict_df , years_countries, columns, colonizer_countries)
    yc_conflict_post_df.to_csv("datasets/colonization_conflict_year_colon_countries_post.csv")

    return yc_conflict_pre_df, yc_conflict_post_df

def get_yc_conflict_df(conflict_df, years_countries, columns, colonizer_countries):
    """ Create countries/years conflicts dataframe """
    yc_conflict_df = pd.DataFrame(years_countries, columns=columns)
    yc_conflict_df = yc_conflict_df.set_index('Year')

    print(conflict_df.index)
    for index in range(len(conflict_df)):
            year = conflict_df.get_value(index,'year')
            colonizer = conflict_df.get_value(index,'colonizer_country')

            for country in colonizer_countries:
                if colonizer == country:
                    yc_conflict_df.set_value(year, country, yc_conflict_df.get_value(year, country)+1)

    return yc_conflict_df
