IFQ Accounting:
Business Rules for sending EM and Logbook Data to NMFS

Overview of Process:

• Logbook data is submitted by captains within one business day of landing. The data is entered
by PSMFC staff shortly after receipt. If there are problems with the data that is submitted (e.g.
blurry photos, missing data on the logbook, late submissions) then data may be further delayed.
• EM data is reviewed shortly after it is received at PSMFC. Because multiple fishing trips may be
included on a drive, it may take several weeks before the data is received and reviewed.
• Logbook and EM data are uploaded nightly to a database at PSMFC. Automated processes in
the database apply business rules that estimate fish weights when the weight is not available,
calculate discards for lost pots, allocate discards for fish that were not identified to species or
IFQ category level, and apply discard mortality rates.
• After all other calculations are complete, business rules for selecting the debit source (EM or
logbook) are applied. Discard weights are sent to NMFS in the nightly feed.
• Logbook and EM data both go through a QAQC process that may result in changes to the Vessel
Accounting System after the data is originally uploaded. Unusual cases, such as lost gear (other
than pots), may require manual calculations of discards that also are applied at a later date.

Missing Weights

In the pot boat fleet, EM reviewers provide counts and lengths rather than the weight of most IFQ
discards. In all fisheries, occasionally no weight or length data is available for a fish recorded either in
EM or in a logbook. In EM this occurs most often when the fish is discarded unintentionally before
length or weight can be estimated, or when the fish is in too poor condition to estimate weight or
length.
When only a count is provided, the weight is estimated preferentially in the following order:
1) The average weight of fish of that species calculated using the retained counts from the logbook
and the total weight retained from Etix.
2) The average weight of fish of that species calculated using the retained counts from the logbook
and the retained weight from the logbook.
3) The average weight of fish of that species calculated using the discard count and discard weight
from the logbook.
4) Using the length and a length weight equation. See Appendix A for additional details.
Note that originally the length-weight equation was used preferentially, however we found that the
weights derived from the length-weight equation for sablefish (the vast majority of calculated weights
are for sablefish discards from pot boats) were consistently leading to higher weights than those
recorded by fishermen in their logbooks. While this could be attributed to misreporting (intentional or
not), we found that the same vessels were able to accurately estimate their retained weight (i.e. the
total retained weight on the logbook was similar to the retained weight on their fish ticket). Since the
length-weight equation appeared to produce a bias, we moved it to a lower order of preference,
however this might be revisited at a future date.

Lost Gear

Lost pots
When a pot is lost, the discard is calculated as the average weight of catch (both discarded and retained)
from all other pots in the string. This calculation is automated.

Other lost gear
Discards for any other type of lost gear are calculated manually and therefore these debits may appear
later in the Vessel Accounting System than other debits. The specific calculation depends on the type of
gear lost, but the general goal is to estimate based on the catch (both retained and discarded) from
similar hauls or trips. For example, a lost string of pots is calculated as the average catch from other
pots on that trip multiplied by the number of pots on the lost string. A lost trawl net would be
calculated based on the catch per hour of towing for other hauls on the same trip multiplied by the
hours the lost net was towed.

Allocating discards from unidentified or mixed species groups

Non-selective Discards
Non-selective discards are primarily unintentional discards in the whiting fleet (e.g. net bleeds). Nonselective
discards are reported in both EM and in logbooks. Because the catch composition of these
discards is assumed to be similar to the overall catch, the discard weight is apportioned based on the
ratio of pounds landed per species on the fish ticket.

Example:
o Vessel has 1000 pounds of non-selective discards
o Fish ticket shows they landed 90K lbs whiting, 5K lbs widow, and 5K lbs shortbelly rockfish
o Calculated EM discard is 900lbs whiting and 50 lbs widow. Shortbelly is not an IFQ species so
there is no debit for the remaining 50 lbs.

Selective Discards
Selective discards are allowed based on the rules set out for each vessel in their Vessel Monitoring Plan.
Selective discards should always be reported to species in the logbook. In EM, selective discards are
generally identified to species, however some fish can only be identified to a group level (e.g. mixed
rockfish or mixed thornyheads). In these cases, the discard weight is apportioned among IFQ categories
based on the ratio of fish from that group in the logbook.

Example:
o Logbook reports 5 pounds Dover Sole and 5 pounds English Sole discards
o EM reports 20 pounds Unidentified Flatfish discards
o EM discards are split 50 %Dover/50% English per the logbook ratio
o Final EM record is 10 pounds Dover Sole and 10 pounds English Sole discards
Whenever possible, the logbook ratio from the same trip is used, however if no species from that group
were reported in that logbook, a ratio from all trips from that vessel or from that fleet in the previous
year is used.

See Appendix C for additional details on the allocation of discards from unidentified or mixed species
groups.

Discard Mortality Rates
Sablefish and lingcod discards are prorated based on a fleet-specific discard mortality rate. Pacific
halibut discards are prorated based on the time the fish is on deck prior to discarding for bottom trawl
vessels, while pot vessels have a fleet-specific discard mortality rate.
Sablefish
• Midwater trawl - 100% mortality (no pro-ration needed)
• Pot - 20% mortality
• Bottom trawl - 50% mortality
Lingcod
• Midwater trawl - 100% mortality (no pro-ration needed)
• Pot - 7% mortality
• Bottom trawl - 50% mortality
Pacific halibut
• Midwater trawl - 100% mortality (no pro-ration needed)
• Pot - 18% mortality
• Bottom trawl - calculated based on time on deck. See Appendix D for details

Note that all flat rate DMRs are applied regardless of the condition of the fish. That means that they are
applied even to fish which may be in parts or otherwise obviously dead.
Selecting whether to use EM or LB as the Debit Source
After all other calculations are complete, the EM and logbook estimates of discards are compared for
each IFQ category at the trip level. Either EM or logbook is selected as the source for the debit that will
be applied in the Vessel Accounting System, based on the rules below:
Shoreside Hake and Whiting Vessel Rockfish Target:
• If EM discards = 0 (no discards reported), use Logbook
• If Logbook discards = 0 (no discards reported), use EM
• If EM and Logbook are both > 0, and the difference between the two is ≤10% of the EM
estimate, use logbook
• If EM and Logbook are both > 0, and the difference between the two is >10% of the EM
estimate, use whichever is larger
Fixed Gear and Bottom Trawl:
• Overfished species1:
o Use larger of the two estimates
• Other species:
o If EM discards = 0 (no discards reported), use Logbook
o If Logbook discards = 0 (no discards reported), use EM
o If EM and Logbook are both > 0, and the difference between the two is ≤10% of the EM
estimate, use logbook
o If EM and Logbook are both > 0, and the difference between the two is >10% of the EM
estimate, use whichever is larger
1 Canary Rockfish, Bocaccio Rockfish S. of 40°10’, Cowcod Rockfish S. of 40°10’, Darkblotched Rockfish, Yelloweye
Rockfish, Petrale Sole, and Pacfic Ocean Perch N. of 40°10’ (IFQ categories 3, 2, 5, 6, 28, 20, 18)

Appendix A: Length-Weight Equations
Data:
In the pot boat fleet, EM reviewers estimate the length rather than the weight of most IFQ discards. The
length is estimated when the crew holds the fish against a Marley board in front of the camera.
Approach:
For IFQ species, a length-weight equation found in the scientific literature is sometimes used to
calculate the weight of a fish based on its length.
Small thornyheads often cannot be determined to species. Because the length-weight equations of
shortspine and longspine are very close, and because weights are rounded to the nearest pound, using
either equation generally results in the same weight estimate. We expect that a higher percentage of
these are longspine thornyheads, due to their size and reviewing past logbooks, therefore we use the
longspine thornyhead equation to estimate the weight of unidentified thornyheads.
Specific equations and data sources:

Length weight equations used in the database all take the form: Wlbs = αLcmβ

The table below shows values of alpha and beta for each equation as well as the source of the equation.

Common Name α β Citation
Pacific Halibut 0.000009209 3.24 1
Dover Sole 0.000008952 3.2494 2
English Sole 0.000009216 3.227938 3
Petrale Sole 0.000004299 3.49 4
Arrowtooth Flounder 0.000009436 3.2101 5
Pacific Cod 0.000022937 2.9919 6
Sablefish 0.000003927 3.430072 7
Pacific Hake 0.000011394 3.060471 3
Pacific Ocean Perch 0.000019842 3.133 8
Bocaccio Rockfish 0.000035715 2.881 8
Widow Rockfish 0.000036156 2.942 8
Darkblotched Rockfish 0.000065036 2.824 8
Canary Rockfish 0.000111113 2.664 8
Splitnose Rockfish 0.000042990 2.927 8
Yellowtail Rockfish 0.000079146 2.745 8
Yelloweye Rockfish 0.000016314 3.222 8
Chilipepper Rockfish 0.000016755 3.12 8
Shortspine Thornyhead 0.000008598 3.357 8
Longspine Thornyhead 0.000016061 3.16 9
Cowcod Rockfish 0.000022267 3.093 8
Lingcod 0.000006298 3.30635 10
Shortspine/Longspine Thornyheads 0.000016061 3.16 9

1 IPHC
2 Sampson DB, Wood C (2001) Stock Status of Dover Sole off the US West Coast in 2000. Report from Hatfield
Marine Science Center, Oregon State University, Newport, OR.
3 Weinberg KL, Wilkins ME, Shaw FR, Zimmerman M (2002) The 2001 Pacific West Coast Bottom Trawl Survey
of Groundfish Resources: Estimates of Distribution, Abundance, and Length and Age Composition. NOAA
Tech. Memor. NMFS-AFSC-128.
4 Turnock J, Wilkins M, Saelens M, Wood C (1993) Status of West Coast Petrale Sole in 1993. Report from
Alaska Fisheries Science Center, Seattle, WA and Oregon Department of Fish and Wildlife, Newport, OR.
5 Rickey MH (1993) Status of the Coastal Arrowtooth Flounder Resource in 1993. Report from Washington
Department of Fisheries, Olympia, WA.
6 Karp WA, Miller BS (1977) Pacific Cod (Gadus macrocephalus) Studies in Port Townsend Bay, Washington.
Report from the Fisheries Research Institute, University of Washington to the US Navy.
7 Parks NB, Shaw FR (1994) Relative abundance and size composition of sablefish (Anoplopoma fimbria) in the
coastal waters of California and Southern Oregon, 1984-1991. NOAA Tech. Memo. NMFS-AFSC-35. 38p.
8 Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California
Press.
9 Haigh R, Olsen N, Starr P (2005) A Review of Longspine Thornyhead (Sebastolobus altivelis) along the Pacific
Coast of Canada: biology, Distribution, and Abundance Trends. Research Document 2005/097 Fisheries and
Oceans Canada.
10 Jagielo TH (1994) Assessment of Lingcod (Ophiodon elongatus) in the area north of 45° 46' N (Cape Falcon)
and South of 49° 00' N in 1994. Report from Washington Department of Fish and Wildlife, Olympia, WA.

Appendix B: Lost Gear
Calculations for lost nets or lost strings of pots are done manually, and then applied to the vessel
account (written to the CalculatedTripDiscards table in the CatchReporting database).

Lost Strings of Pots
For lost strings of pots, the average catch per pot for the rest of the trip is calculated and then multiplied
by the number of lost pots:
(Σ Discards + Σ Retained) / (nTotal Pots – nLost Pots) * nLost Pots
where the discards are taken from the EM review and the retained catch is taken from the fish ticket.
There might be cases where it would be appropriate not to use the entirety of the trip to calculate the
average catch per pot. For example, if a boat fished in two disparate areas or had different target
species. This is not common for pot boats, so generally the catch from the whole trip is used. This
decision is made on a case by case basis.

Lost Trawl Nets
For lost trawl nets, the average catch per hour of tow time is calculated for the rest of the trip and then
multiplied by the number of hours of towing the lost net:
(Σ Discards + Σ Retained) /( Σ Haul Hrs – Lost Haul Hrs) * Lost Haul Hrs
where the discards are taken from the EM review and the retained catch is taken from the fish ticket.
For trawlers, there are more cases where it is appropriate not to use the entirety of the trip to calculate
the average catch per hour. For example, if the trawler used multiple gear types or had different target
species, the calculations would be based on the catch per hour from hauls with the same gear type and
target (if any exist). This decision is made on a case by case basis.

Appendix C: Detailed Rules for mixed species allocation

Non-selective Discards
Data:
Non-selective discards are fish that were not intentionally discarded or that were not sorted prior to
discarding. Most commonly, this occurs from net bleeds or net cleaning in the whiting fishery prior to
the net coming on board.
Approach:
Allocate the weight based on the ratio of fish species on the fish ticket
Specific Business Rules:
• Determine composition of fish ticket
• Multiply the percentage of each species by the total non-selective discard weight
• Drop any discard weights that are not IFQ species
Selective Discards that are not Identified to Species
Data:
EM reviewers are occasionally unable to identify a fish to an IFQ category. In most of these cases, they
can identify the fish to a family group or similar classification level; however, for IFQ accounting
purposes these fish need to be assigned to a specific IFQ category.
The groups of species that sometimes are not identified to IFQ category are flatfish, rockfish,
thornyheads, and roundfish. In 2015, about 162 pounds of discards were not identified to species (2%
of all flatfish; 27% of all rockfish; 20% of all thornyheads; 0% of all roundfish).
Approach:
Divide the EM discard pounds from a mixed species group (thornyheads, flatfish, rockfish, roundfish)
according to the ratio of discard species from that group in the logbook. The ratio is calculated at the
trip level.
Example:
o Logbook reports 5 pounds Dover Sole and 5 pounds English Sole discards
o EM reports 20 pounds Unidentified Flatfish discards
o EM discards are split 50 %Dover/50% English per the logbook ratio
o Final EM record is 10 pounds Dover Sole and 10 pounds English Sole discards
Specific Business Rules:
• Rules apply to discards in the EM Bottom Trawl and Fixed Gear fleets.
• Rules apply to discards that are identified to a group level (thornyheads, flatfish, rockfish,
roundfish) rather than a specific IFQ category.
• Discards identified to a group level are divided up and assigned to an IFQ category based on the
logbook reported ratio of all species (IFQ and non-IFQ) from that group. If the logbook reports
non-IFQ species from the group, that same proportion would be dropped from the EM estimate.
For example, if EM has 10 lbs of unidentified flatfish and the logbook reports 5 lbs of Dover sole
and 5 lbs of deepsea sole, the final EM estimate would be 5 lbs of Dover sole and the remaining
5 lbs would be dropped from debiting.
• The logbook ratio is calculated preferentially in the following order:
1. Use the ratio of species in the group from the trip logbook.
2. Use the ratio of species in the group from the vessel’s logbooks (sum of all logbooks in
the previous year within the same management area) if there are no fish from the group
reported in the logbook from that trip.
3. Use the ratio of species in the group from the fleet logbooks (sum of all fleet logbooks in
the previous year in the same management area) if there are no fish from the group
reported in either the trip logbook or the vessel’s previous year logbooks.
• Calculations are made at the trip level.
• If an EM reviewer identifies some fish within a group to a species level and others to a group
level, only the fish identified to a group level are divided up per the above rules. For example, if
the reviewer identifies 5 lbs of English sole and 3 lbs of unidentified flatfish, only the 3 lbs of
unidentified flatfish are split up based on the logbook ratio.
• All unidentified categories and combo species from a given group are combined and then
divided per the logbook ratio (for example, unidentified Sanddabs are combined with
unidentified flatfish).
• If there are more than 50 pounds of discards of unidentified fish (fish that cannot be identified
even to a group level) for a trip, the discards will be divided according to the ratio of fish on the
fish ticket (i.e., the discard will be treated like a non-selective discard). If there are less than 50
pounds, these discards will be dropped.
Species Included in these Rules:
The table below shows all of the IFQ categories and mixed species groups for Thornyheads, Rockfish,
and Flatfish. Any discards from the mixed species categories will be assigned to one or more of the IFQ
categories in that group based on the logbook ratio.
Group IFQ Categories Mixed Species Category
Thornyheads Longspine thornyheads North of 34°27' N. Mixed Thornyhead
Shortspine thornyheads North of 34°27' N.
Shortspine thornyheads South of 34°27' N.
Flatfish* Arrowtooth flounder Unidentified Flatfish
Dover sole Unidentified Sanddab
English sole Petrale/Flathead Sole
Other flatfish Flatfish Unid(IFQ)
Petrale sole
Starry flounder
Rockfish Bocaccio rockfish South of 40°10' N.
Canary rockfish
Chilipepper rockfish South of 40°10' N.
Cowcod South of 40°10'
Darkblotched rockfish
Minor shelf rockfish North of 40°10' N.
Minor slope rockfish North of 40°10' N.
Minor shelf rockfish South of 40°10' N.
Minor slope rockfish South of 40°10' N.
Pacific ocean perch North of 40°10' N.
Splitnose rockfish South of 40°10' N.
Widow rockfish
Yelloweye rockfish
Yellowtail rockfish North of 40°10' N.
Unidentified Rockfish
Dark Rockfish
Red Rockfish
Yelloweye/Vermillion/Canary
Rockfish
Yelloweye/Vermillion Rockfish
Yelloweye/Canary Rockfish
Yellowmouth/Canary Rockfish
Pacific Ocean Perch/Yellowmouth
Rockfish
Canary/Vermillion Rockfish
Bocaccio/Silvergray Rockfish
Aurora/Splitnose Rockfish
Banded Rockfish Unidentified
Dark Rockfish(IFQ)
Rockfish Unid(IFQ)
Sunset/Canary Rockfish
Sunset/Canary/Vermillion Rockfish
Roundfish Pacific Cod
Pacific Whiting
Sablefish North of 36° N.
Sablefish South of 36° N.
Lingcod North of 40°10' N.
Lingcod South of 40°10' N.
Roundfish Unid
Roundfish Unid (IFQ)
* Note that Pacific Halibut is not included in the flatfish group because EM reviewers are able to distinguish halibut
from ‘Unidentified Flatfish’ and other mixed species categories.

Appendix D: Time on Deck based Halibut DMR

Formula:
DMR = P(Excellent)*.2+P(Poor)*.55+P(Dead)*.9
where
T = Time on Deck (minutes)
αE = 1.78186
αP = 2.44045
βE = -1.11352
βP = -1.00494
P(Excellent) = exp(αE+βE*log(T))/(1+exp(αE+βE*log(T)))
P(Poor) = exp(αP+βP*log(T))/(1+exp(αP+βP*log(T)))- P(Excellent)
P(Dead) = 1-( P(Excellent)+ P(Poor))

Additional rules:
The time on deck formula is only applied if halibut are handled safely and are discarded in view of the
camera.
Safe handling instructions from the IPHC are as follows:
Practices should include supporting the fish with one hand under the body while releasing it
head-first into the sea, avoiding handling fish by the gills and returning fish to the water by the
tail (potentially disarticulating the spine).