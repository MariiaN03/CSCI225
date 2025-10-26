//Bill visibility 
document.getElementById("CalculateButtonID").addEventListener("click", function(e) {
    e.preventDefault(); 
    document.getElementById("DetailsID").style.visibility = "visible";
});

//Bill

function calculateBill(e) {
    e.preventDefault();
    let Tier1 = 0;
    let Tier2 = 0;
    let Tier3 = 0;
    let FuelCost = 0;
    let FranchiseFee = 0;

    const monthlyUsage = parseFloat(document.getElementById("UsageID").value);
    const days = parseFloat(document.getElementById("DaysID").value);
    const salesTax = parseFloat(document.getElementById("SalesTaxID").value);

    const cityLimits = document.getElementById("CityLimitsID").checked;
    const summerMonth = document.getElementById("SummerMonthID").checked;

    console.log(monthlyUsage);
    console.log(days);
    console.log(salesTax);
    console.log(cityLimits);
    console.log(summerMonth);


    //calculate bill
    const baseCharge = days * (46.03 / 100);

    if (monthlyUsage <= 650 && summerMonth === true) {
        Tier1 = monthlyUsage * 0.066678;
        Tier2 = 0;
        Tier3 = 0;
    } else if (monthlyUsage > 650 && monthlyUsage <= 1000 && summerMonth === true) {
        Tier1 = 650 * 0.066678;
        Tier2 = (monthlyUsage - 650) * 0.110748;
        Tier3 = 0;
    } else if (monthlyUsage > 1000 && summerMonth === true) {
        Tier1 = 650 * 0.066678;
        Tier2 = 350 * 0.110748;
        Tier3 = (monthlyUsage - 1000) * 0.114625;
    } else if (monthlyUsage <= 650 && summerMonth === false) {
        Tier1 = monthlyUsage * 0.062404;
        Tier2 = 0;
        Tier3 = 0;
    } else if (monthlyUsage > 650 && monthlyUsage <= 1000 && summerMonth === false) {
        Tier1 = 650 * 0.062404;
        Tier2 = (monthlyUsage - 650) * 0.103042;
        Tier3 = 0;
    } else if (monthlyUsage > 1000 && summerMonth === false) {
        Tier1 = 650 * 0.062404;
        Tier2 = 350 * 0.103042;
        Tier3 = (monthlyUsage - 1000) * 0.106755;
    }

    const baseRevenue = baseCharge + Tier1 + Tier2 + Tier3;

    if (summerMonth === true) {
        FuelCost = monthlyUsage * 0.045876;
    } else {
        FuelCost = monthlyUsage * 0.042859;
    }

    const DemandRider = baseRevenue * (1.5989 / 100);
    const NuclearRider = baseRevenue * (4.1562 / 100);
    const EnvironmentalRider = baseRevenue * (16.2813 / 100);
    
    const totalRevenue = baseRevenue + FuelCost + DemandRider + NuclearRider + EnvironmentalRider;

    if (cityLimits === true) {
        FranchiseFee = totalRevenue * (3.0674 / 100);
    } else {
        FranchiseFee = totalRevenue * (1.1839 / 100);
    }

    const TotalBeforeTax = totalRevenue + FranchiseFee;
    const TotalWithTax = TotalBeforeTax + (TotalBeforeTax * (salesTax / 100));


    console.log("Base Charge: " + baseCharge);
    console.log("Tier 1: " + Tier1);
    console.log("Tier 2: " + Tier2);
    console.log("Tier 3: " + Tier3);
    console.log("Base Revenue: " + baseRevenue);
    console.log("Fuel Cost: " + FuelCost);
    console.log("Demand Rider: " + DemandRider);
    console.log("Nuclear Rider: " + NuclearRider);
    console.log("Environmental Rider: " + EnvironmentalRider);
    console.log("Total Revenue: " + totalRevenue);
    console.log("Franchise Fee: " + FranchiseFee);
    console.log("Total Before Tax: " + TotalBeforeTax);
    console.log("Total With Tax: " + TotalWithTax);

    //display bill
    document.getElementById("BaseChargeID").innerHTML = baseCharge.toFixed(2);
    document.getElementById("Tier1ComponentID").innerHTML = Tier1.toFixed(2);
    document.getElementById("Tier2ComponentID").innerHTML = Tier2.toFixed(2);
    document.getElementById("Tier3ComponentID").innerHTML = Tier3.toFixed(2);
    document.getElementById("BaseRevenueID").innerHTML = baseRevenue.toFixed(2);
    document.getElementById("FuelCostRiderID").innerHTML = FuelCost.toFixed(2);
    document.getElementById("DemandSideManagementID").innerHTML = DemandRider.toFixed(2);
    document.getElementById("NuclearConstructionCostRecoveryID").innerHTML = NuclearRider.toFixed(2);
    document.getElementById("EnvironmentalComplianceCostRecoveryID").innerHTML = EnvironmentalRider.toFixed(2);
    document.getElementById("TotalRevenueID").innerHTML = totalRevenue.toFixed(2);
    document.getElementById("FranchiseFeeID").innerHTML = FranchiseFee.toFixed(2);
    document.getElementById("TotalExcludingTaxID").innerHTML = TotalBeforeTax.toFixed(2);
    document.getElementById("TotalWithTaxID").innerHTML = TotalWithTax.toFixed(2);

    //openNewPage
    if (TotalWithTax > 500) {
        window.open("https://www.georgiapower.com/residential/save-money-and-energy/products-programs.html", "_blank");
    }
}

document.getElementById("CalculateButtonID").addEventListener("click", calculateBill);