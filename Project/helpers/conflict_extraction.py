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

    # Create the pre/post colonization conflict dataframe
    pre_colonization_conflict_df, post_colonization_conflict_df = get_pre_post_colonization_df(conflict_df)

    return conflict_df, pre_colonization_conflict_df, post_colonization_conflict_df


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
    colonized_countries = list(colonized_df["Colonized Country"])

    # Create two empty dataframe
    columns = ["location", "ID", "sidea", "side b", "incomp", "year", "intensity", 
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
            indep_year = int(colonized_df[colonized_df['Colonized Country']==country]['Year'])
            ID = list(colonized_df[colonized_df['Colonized Country']==country]['ID'])[0]

            start_year = int(conflict_df.loc[index, 'startdate'].split("-")[0])

            conflict_df_tmp = conflict_df.loc[index:index,]
            conflict_df_tmp.set_value(index, 'ID', ID)

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
    pre_colonization_conflict_df.reset_index(drop=True)
    pre_colonization_conflict_df = pre_colonization_conflict_df[columns]
    pre_colonization_conflict_df.to_csv("datasets/colonization_conflict_pre.csv")

    # Create the post colinzation dataframe
    post_colonization_conflict_df.reset_index(drop=True)
    post_colonization_conflict_df = post_colonization_conflict_df[columns]
    post_colonization_conflict_df.to_csv("datasets/colonization_conflict_post.csv")

    return pre_colonization_conflict_df, post_colonization_conflict_df
