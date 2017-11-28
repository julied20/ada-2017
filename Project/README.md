# Has the decolonisation set the countries free?

## Milestone I

### Abstract

Different patterns appeared after the decolonisation. Some countries, like Morocco (french ex-colony), who obtained its independence in a “relative” peace, was and is not weakened by wars. On the contrary, Syria (also a french ex-colony) obtained its independence with difficulties, and since then, is very unstable. Can the difference of stability between these two countries be linked to the way they obtain their independence?

The problematic of this project is the following : How did the decolonization affected the stability of the colonised country? To answer this question, the 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset that can be obtained [here](http://ucdp.uu.se/downloads/) is used. This Dataset covers the armed conflicts between 1946 and 2016.

The aim of this project is to visualise, on an interactive map, the different conflicts linked to the decolonisation. A data story will be created to retrace what has been done during this project. 

### Research questions

- How did the decolonisation affected the stability of the colonised country?
- Can we observe some pattern for the future country stability depending on how the colonizer handled the conflict?
- How the decolonisation affected the type of government put in place after the decolonisation? 

### Dataset

**Dataset :** 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset. Can be downloaded [here](http://ucdp.uu.se/downloads/).

The Dataset comes from a joint project between the Uppsala Conflict Data Program (UCDP) and the Peace Research Institute in Oslo (PRIO). 
It contains information on armed conflicts where at least one party is the government of a state in the time period 1946-2016.
UCDP defines conflict as: “a contested incompatibility that concerns government and/or territory where the use of armed force between two parties, of which at least one is the government of a state, results in at least 25 battle-related deaths in a calendar year.”

This Dataset regroups all the conflicts informations, like the countries or political parties involved, or the date of the conflict. But in order to interpret these information and answer the research questions, more material is needed.
This additional material is extracted from Wikidata. Wikidata is a central storage for the structured data of Wikipedia, Wikisource and others.

## Milestone II
# Has the decolonisation set the countries free?

## Milestone I

### Abstract

Different patterns appeared after the decolonisation. Some countries, like Morocco (french ex-colony), who obtained its independence in a “relative” peace, was and is not weakened by wars. On the contrary, Syria (also a french ex-colony) obtained its independence with difficulties, and since then, is very unstable. Can the difference of stability between these two countries be linked to the way they obtain their independence?

The problematic of this project is the following : How did the decolonization affected the stability of the colonised country? To answer this question, the 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset that can be obtained [here](http://ucdp.uu.se/downloads/) is used. This Dataset covers the armed conflicts between 1946 and 2016.

The aim of this project is to visualise, on an interactive map, the different conflicts linked to the decolonisation. A data story will be created to retrace what has been done during this project. 

### Research questions

- How did the decolonisation affected the stability of the colonised country?
- Can we observe some pattern for the future country stability depending on how the colonizer handled the conflict?
- How the decolonisation affected the type of government put in place after the decolonisation? 

### Dataset

**Dataset :** 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset. Can be downloaded [here](http://ucdp.uu.se/downloads/).

The Dataset comes from a joint project between the Uppsala Conflict Data Program (UCDP) and the Peace Research Institute in Oslo (PRIO). 
It contains information on armed conflicts where at least one party is the government of a state in the time period 1946-2016.
UCDP defines conflict as: “a contested incompatibility that concerns government and/or territory where the use of armed force between two parties, of which at least one is the government of a state, results in at least 25 battle-related deaths in a calendar year.”

This Dataset regroups all the conflicts informations, like the countries or political parties involved, or the date of the conflict. But in order to interpret these information and answer the research questions, more material is needed.
This additional material is extracted from Wikidata. Wikidata is a central storage for the structured data of Wikipedia, Wikisource and others.

## Milestone II

### Dataset Handling

The UCDP dataset is relatively complete, without much errors in the data presentation. However, a few simplifications needed to be made. For example, in the belligerants of some conflicts we delete terms like 'Government of' that are considered as representing the current State. Those corrections are made and commented in 'clean_conflict.py'

In order to pursue our analysis on the former european colonies, we create a new dataset that will regroup the colonisers and their colonies, while also keeping trace of the independance date and the ISO2 of the country. This new dataset is created by scraping wikipedia's webpages of countries. All the comments of the functions implied for this are detailled and commented in 'dataset_colonies.py'


### Exploratory Analysis

The main jupyter notebook regroups the exploratory analysis performed on our datasets. We focus mainly on the decolonisation process, trying to display meaningful informations to better grasps the state of the former colonized continents and countries.

However, we found one major limitation in our datasets that might limit the scope of our project. In order to analyse properly the stability of the former colonized countries, we wanted to look as the conflicts happening in the country. Most of the times, those conflicts are represented as a simple entry that is renewed each year. We have therefore a limited scope on the observation of stability, it would be interesting to find a way to scrap or find a new dataset that contains also the number of casualties. For that, we could use another UCDP dataset which also contains this value for the periof 1990-2017, it would offer a photography of the current state of those countries.