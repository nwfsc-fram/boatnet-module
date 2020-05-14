/*

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

*/
