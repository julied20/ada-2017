import pandas as pd
import requests
import re
import os
import numpy as np
from datetime import datetime

def clean_ucdp():

    conflict_df = pd.read_csv('../datasets/ucdp-prio-acd-171.csv')
    countries_codes = pd.read_csv('datasets/countries_codes_and_coordinates.csv')
    
    # Some preprocessing is made on the dataset in order to only have the country name, to facilitate the matching and the visualisation after
    for index, row in conflict_df.iterrows():
        conflict_df.loc[index, 'location'] = re.sub(r'\([^)]*\)', '', conflict_df.loc[index, 'location'])
        conflict_df.loc[index, 'location'] = conflict_df.loc[index, 'location'].rstrip()
        conflict_df.loc[index, 'sidea'] = conflict_df.loc[index, 'sidea'].replace('Government of ', '')
        conflict_df.loc[index, 'startdate'] = datetime.strptime(conflict_df.loc[index, 'startdate'], '%Y-%m-%d').month

        # If the column territory is empty, we can assume that the conflict happens at the same place than the variable 'location'. So we set the 'terr' variable with the 'location' value to avoid NaN. 
        if pd.isnull(row['terr']) :
            conflict_df.loc[index, 'terr'] = row['location'] 
        
    #We have another csv that represent the countries, their ISO and their geographic coordinate. It will be useful to put display theses countries on a map. But some countries like South Vietnam, North Vietnam or South Yemen are not in this file, because they are not countries anymore. So the decision is made to rename these country with the actual name. 
    for index, row in conflict_df.iterrows():
        if conflict_df.loc[index, 'location'] == 'North Vietnam' or conflict_df.loc[index, 'location'] == 'South Vietnam, Vietnam' or conflict_df.loc[index, 'location'] == 'South Vietnam':
            conflict_df.loc[index, 'location'] = 'Vietnam'
        if conflict_df.loc[index, 'location'] == 'South Yemen':
            conflict_df.loc[index, 'location'] = 'Yemen'    
    
    # We drop the useless columns
    conflict_df = conflict_df.drop(['gwnoa2nd', 'gwnob2nd', 'gwnoloc', 'gwnoa', 
                      'gwnob', 'version', 'startdate2', 'startprec', 
                      'startdate2', 'startprec2' , 'ependprec', 'sidea2nd', 
                      'sideb2nd', 'epend'], axis=1)

    conflict_df = conflict_df.rename(index=str, columns={ "startdate" : "start_month"});

    # We add the ISO to each row, to situate the conflict. 
    iso_countries = countries_codes['Country'].tolist()
    iso_code = countries_codes['ISO2'].tolist()
    sidea = conflict_df['sidea'].tolist()
    location  = conflict_df['location'].tolist()

    
    # The location of the conflict should be in the variable location. Sometimes, in this variable, a specific region of a country is named, which doesn't have an  ISO. In this case, the choice is made to set the ISO from the the location country, as the location represent the name of the country/ies that have a primary claim to the conflict. As it can have several countries in the variable location, we look into the variable sidea, which represent the primary party to a conflict. If we don't find anything, we set the ISO to 0
    iso_conflict = []

    for i in range(0, len(sidea)):
        if terr[i] in iso_countries:
            j = iso_countries.index(terr[i])
            iso_conflict.append(iso_code[j])
        elif location[i] in iso_countries:
            j = iso_countries.index(location[i])
            iso_conflict.append(iso_code[j])
        elif sidea[i] in iso_countries:
            j = iso_countries.index(sidea[i])
            iso_conflict.append(iso_code[j])
        else:
            iso_conflict.append(0)


    clean_filename = 'datasets/clean_conflict.csv'
    conflict_df = conflict_df.assign(ISO2 = iso_conflict )
    conflict_df.to_csv(clean_filename)
    
    return clean_filename
    