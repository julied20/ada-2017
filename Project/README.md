# Has the decolonization set the countries free?

## Final Datastory - Mileston III

The last milestone aimed at producing a datastory to answer our problematic: how did the decolonization affected the stability of the colonized country?

[One can find our datastory here](https://julied20.github.io/ada-2017/core.html).

It is divided in four chapters, distributed on different webpages. Most maps are interactive and will display some informations only after selecting the desired data on the barplots.

Jean Gschwind : Data cleaning and handling, production of usefull csv files

Julie Djeffal : Graph and Maps production, website code

Tristan Besson : Data Story Writing & Exploratory Analysis

## Milestone I

### Abstract

Different patterns appeared after the decolonization. Some countries, like Morocco (French ex-colony), who obtained its independence in a “relative” peace, was and is not weakened by wars. On the contrary, Syria (also a French ex-colony) obtained its independence with difficulties, and since then, is very unstable. Can the difference of stability between these two countries be linked to the way they obtain their independence?

The problematic of this project is the following : How did the decolonization affected the stability of the colonized country? To answer this question, the 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset that can be obtained [here](http://ucdp.uu.se/downloads/) is used. This Dataset covers the armed conflicts between 1946 and 2016.

The aim of this project is to visualize, on an interactive map, the different conflicts linked to the decolonization. A data story will be created to retrace what has been done during this project.

### Research questions

- How did the decolonization affected the stability of the colonized country?
- Can we observe some pattern for the future country stability depending on how the colonizer handled the conflict?
- How the decolonization affected the type of government put in place after the decolonization?

### Dataset

**Dataset :** 'UCDP/PRIO Armed Conflict Dataset version 17.1' dataset. Can be downloaded [here](http://ucdp.uu.se/downloads/).

The Dataset comes from a joint project between the Uppsala Conflict Data Program (UCDP) and the Peace Research Institute in Oslo (PRIO).
It contains information on armed conflicts where at least one party is the government of a state in the time period 1946-2016.
UCDP defines conflict as: “a contested incompatibility that concerns government and/or territory where the use of armed force between two parties, of which at least one is the government of a state, results in at least 25 battle-related deaths in a calendar year.”

This Dataset regroups all the conflicts informations, like the countries or political parties involved, or the date of the conflict. But in order to interpret these information and answer the research questions, more material is needed.
This additional material is extracted from Wikidata. Wikidata is a central storage for the structured data of Wikipedia, Wikisource and others.

## Milestone II

### Dataset Handling

The UCDP dataset is relatively complete, without much errors in the data presentation. However, a few simplifications needed to be made. For example, in the belligerents of some conflicts we delete terms like 'Government of' that are considered as representing the current State. Those corrections are made and commented in 'clean_conflict.py'

In order to pursue our analysis on the former European colonies, we create a new dataset that will regroup the colonizers and their colonies, while also keeping trace of the independence date and the ISO2 of the country. This new dataset is created by scraping Wikipedia's webpages of countries. We start from the Wikipedia page who map out [all ex-colonies of European countries](https://en.wikipedia.org/wiki/List_of_former_European_colonies). The script navigate through the different colonies to find the actual country. For example, 'French protectorate in Morocco' is today just 'Morocco'. For this reason, we had some issues with certain country which had a completely webpage (as you can see in the webpage of the [French Mandate for Syria and the Lebanon](https://en.wikipedia.org/wiki/French_Mandate_for_Syria_and_the_Lebanon)). So we decided to had added manually four countries (Algeria, Syria, Lebanon and Niger). We also decided to note taking account of the area which have a size under 1'500km2 for practical reasons (we don't what hundred and hundred of small islands and searching this will increase drastically the code duration). We removed three countries (Ethiopia, Eritrea and Kuwait) because they are not colonies strictly speaking (they were occupied by a foreigner country but not colonized) as well.

All functions implied for this are detailed and commented in 'data_extraction.py' and 'data_from_infobox.py'


### Exploratory Analysis

The main Jupyter Notebook regroups the exploratory analysis performed on our datasets. We focus mainly on the decolonization process, trying to display meaningful informations to better grasps the state of the former colonized continents and countries.

### Further work

The next step will consist mainly in a visualization of our data. We want to be able to observe how and when the conflicts happens, and the evolution of them.
A preview of the kind of visualization that we can have is available here: https://julied20.github.io/ada-2017/ada-2017/core.html

However, we found one major limitation in our datasets that might limit the scope of our project. In order to analyze properly the stability of the former colonized countries, we wanted to look as the conflicts happening in the country. Most of the times, those conflicts are represented as a simple entry that is renewed each year. We have therefore a limited scope on the observation of stability, it would be interesting to find a way to scrap or find a new dataset that contains also the number of casualties. For that, we could use another UCDP dataset which also contains this value for the period of 1990-2017, it would offer a photography of the current state of those countries.
