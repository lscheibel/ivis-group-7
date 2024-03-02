import jsonData from './data.json';
import { StringParser } from '../StringParser';

export interface RawDataEntry {
    country: string;
    countryCode: string;

    pisaMathScore: string;
    pisaScienceScore: string;
    pisaReadingScore: string;
    pisaGeneralAverageScore: string;

    skippedMealsNever: string;
    skippedMealsOncePerWeek: string;
    skippedMealsTwoToThreePerWeek: string;
    skippedMealsFourToFivePerWeek: string;
    skippedMealsAlways: string;

    familySupport: string;
    senseOfBelonging: string;
    parentsFrequentlyAskingAboutDay: string;

    availableFoodMiscellaneous: string;
    availableFoodAlcoholicBeverages: string;
    availableFoodAnimalFats: string;
    availableFoodVegetableOils: string;
    availableFoodOilcrops: string;
    availableFoodFishAndSeafood: string;
    availableFoodSugarCrops: string;
    availableFoodSugarAndSweeteners: string;
    availableFoodStarchyRoots: string;
    availableFoodOtherMeat: string;
    availableFoodMeatSheepAndGoat: string;
    availableFoodMeatPig: string;
    availableFoodMeatPoultry: string;
    availableFoodMeatBeef: string;
    availableFoodEggs: string;
    availableFoodMilk: string;
    availableFoodNuts: string;
    availableFoodFruit: string;
    availableFoodVegetables: string;
    availableFoodPulses: string;
    availableFoodCerealsOther: string;
    availableFoodBarley: string;
    availableFoodMaize: string;
    availableFoodRice: string;
    availableFoodWheat: string;

    foodGramsPerDayFruits: string;
    foodGramsPerDayNonStarchyVegetables: string;
    foodGramsPerDayPotatoes: string;
    foodGramsPerDayOtherStarchyVegetables: string;
    foodGramsPerDayBeansAndLegumes: string;
    foodGramsPerDayNutsAndSeeds: string;
    foodGramsPerDayRefinedGrains: string;
    foodGramsPerDayWholeGrains: string;
    foodGramsPerDayProcessedMeats: string;
    foodGramsPerDayUnprocessedRedMeats: string;
    foodGramsPerDaySeafoods: string;
    foodGramsPerDayEggs: string;
    foodGramsPerDayCheese: string;
    foodGramsPerDayYoghurt: string;
    foodGramsPerDaySugarSweetenedBeverages: string;
    foodGramsPerDayFruitJuices: string;
    foodGramsPerDayTea: string;
    foodGramsPerDaySaturatedFat: string;

    percentageOfSchoolTimeSpentUsingDigitalDevices: string;

    pisaMathScore2003: string;
    pisaMathScore2006: string;
    pisaMathScore2009: string;
    pisaMathScore2012: string;
    pisaMathScore2015: string;
    pisaMathScore2018: string;
    pisaMathScore2022: string;
    pisaReadingScore2003: string;
    pisaReadingScore2006: string;
    pisaReadingScore2009: string;
    pisaReadingScore2012: string;
    pisaReadingScore2015: string;
    pisaReadingScore2018: string;
    pisaReadingScore2022: string;
    pisaScienceScore2006: string;
    pisaScienceScore2009: string;
    pisaScienceScore2012: string;
    pisaScienceScore2015: string;
    pisaScienceScore2018: string;
    pisaScienceScore2022: string;
    pisaGeneralAverage2006: string;
    pisaGeneralAverage2009: string;
    pisaGeneralAverage2012: string;
    pisaGeneralAverage2015: string;
    pisaGeneralAverage2018: string;
    pisaGeneralAverage2022: string;
}

export class CountryDatum {
    id: number;

    countryName: string;
    countryCode: string;

    private pisaMathScore: number;
    private pisaScienceScore: number;
    private pisaReadingScore: number;
    private pisaGeneralAverageScore: number;

    private skippedMealsNever: number | null;
    private skippedMealsOncePerWeek: number | null;
    private skippedMealsTwoToThreePerWeek: number | null;
    private skippedMealsFourToFivePerWeek: number | null;
    private skippedMealsAlways: number | null;

    familySupport: number | null;
    senseOfBelonging: number | null;
    parentsFrequentlyAskingAboutDay: number | null;

    availableFoodMiscellaneous: number | null;
    availableFoodAlcoholicBeverages: number | null;
    availableFoodAnimalFats: number | null;
    availableFoodVegetableOils: number | null;
    availableFoodOilCrops: number | null;
    availableFoodFishAndSeafood: number | null;
    availableFoodSugarCrops: number | null;
    availableFoodSugarAndSweeteners: number | null;
    availableFoodStarchyRoots: number | null;
    availableFoodOtherMeat: number | null;
    availableFoodMeatSheepAndGoat: number | null;
    availableFoodMeatPig: number | null;
    availableFoodMeatPoultry: number | null;
    availableFoodMeatBeef: number | null;
    availableFoodEggs: number | null;
    availableFoodMilk: number | null;
    availableFoodNuts: number | null;
    availableFoodFruit: number | null;
    availableFoodVegetables: number | null;
    availableFoodPulses: number | null;
    availableFoodCerealsOther: number | null;
    availableFoodBarley: number | null;
    availableFoodMaize: number | null;
    availableFoodRice: number | null;
    availableFoodWheat: number | null;

    private foodGramsPerDayFruits: number | null;
    private foodGramsPerDayNonStarchyVegetables: number | null;
    private foodGramsPerDayPotatoes: number | null;
    private foodGramsPerDayOtherStarchyVegetables: number | null;
    private foodGramsPerDayBeansAndLegumes: number | null;
    private foodGramsPerDayNutsAndSeeds: number | null;
    private foodGramsPerDayRefinedGrains: number | null;
    private foodGramsPerDayWholeGrains: number | null;
    private foodGramsPerDayProcessedMeats: number | null;
    private foodGramsPerDayUnprocessedRedMeats: number | null;
    private foodGramsPerDaySeafoods: number | null;
    private foodGramsPerDayEggs: number | null;
    private foodGramsPerDayCheese: number | null;
    private foodGramsPerDayYoghurt: number | null;
    private foodGramsPerDaySugarSweetenedBeverages: number | null;
    private foodGramsPerDayFruitJuices: number | null;
    private foodGramsPerDayTea: number | null;
    private foodGramsPerDaySaturatedFat: number | null;

    percentageOfSchoolTimeSpentUsingDigitalDevices: number | null;

    private pisaMathScore2003: number | null;
    private pisaMathScore2006: number | null;
    private pisaMathScore2009: number | null;
    private pisaMathScore2012: number | null;
    private pisaMathScore2015: number | null;
    private pisaMathScore2018: number | null;
    private pisaMathScore2022: number;
    private pisaReadingScore2003: number | null;
    private pisaReadingScore2006: number | null;
    private pisaReadingScore2009: number | null;
    private pisaReadingScore2012: number | null;
    private pisaReadingScore2015: number | null;
    private pisaReadingScore2018: number | null;
    private pisaReadingScore2022: number;
    private pisaScienceScore2006: number | null;
    private pisaScienceScore2009: number | null;
    private pisaScienceScore2012: number | null;
    private pisaScienceScore2015: number | null;
    private pisaScienceScore2018: number | null;
    private pisaScienceScore2022: number;
    private pisaGeneralAverage2006: number | null;
    private pisaGeneralAverage2009: number | null;
    private pisaGeneralAverage2012: number | null;
    private pisaGeneralAverage2015: number | null;
    private pisaGeneralAverage2018: number | null;
    private pisaGeneralAverage2022: number;

    constructor(id: number, raw: RawDataEntry) {
        this.id = id;

        this.countryName = raw.country;
        this.countryCode = raw.countryCode;

        this.pisaMathScore = StringParser.parseAsNumber(raw.pisaMathScore)!;
        this.pisaScienceScore = StringParser.parseAsNumber(raw.pisaScienceScore)!;
        this.pisaReadingScore = StringParser.parseAsNumber(raw.pisaReadingScore)!;
        this.pisaGeneralAverageScore = StringParser.parseAsNumber(raw.pisaGeneralAverageScore)!;

        this.skippedMealsNever = StringParser.parseAsNumber(raw.skippedMealsNever);
        this.skippedMealsOncePerWeek = StringParser.parseAsNumber(raw.skippedMealsOncePerWeek);
        this.skippedMealsTwoToThreePerWeek = StringParser.parseAsNumber(raw.skippedMealsTwoToThreePerWeek);
        this.skippedMealsFourToFivePerWeek = StringParser.parseAsNumber(raw.skippedMealsFourToFivePerWeek);
        this.skippedMealsAlways = StringParser.parseAsNumber(raw.skippedMealsAlways);

        this.familySupport = StringParser.parseAsNumber(raw.familySupport);
        this.senseOfBelonging = StringParser.parseAsNumber(raw.senseOfBelonging);
        this.parentsFrequentlyAskingAboutDay = StringParser.parseAsNumber(raw.parentsFrequentlyAskingAboutDay);

        this.availableFoodMiscellaneous = StringParser.parseAsNumber(raw.availableFoodMiscellaneous);
        this.availableFoodAlcoholicBeverages = StringParser.parseAsNumber(raw.availableFoodAlcoholicBeverages);
        this.availableFoodAnimalFats = StringParser.parseAsNumber(raw.availableFoodAnimalFats);
        this.availableFoodVegetableOils = StringParser.parseAsNumber(raw.availableFoodVegetableOils);
        this.availableFoodOilCrops = StringParser.parseAsNumber(raw.availableFoodOilcrops);
        this.availableFoodFishAndSeafood = StringParser.parseAsNumber(raw.availableFoodFishAndSeafood);
        this.availableFoodSugarCrops = StringParser.parseAsNumber(raw.availableFoodSugarCrops);
        this.availableFoodSugarAndSweeteners = StringParser.parseAsNumber(raw.availableFoodSugarAndSweeteners);
        this.availableFoodStarchyRoots = StringParser.parseAsNumber(raw.availableFoodStarchyRoots);
        this.availableFoodOtherMeat = StringParser.parseAsNumber(raw.availableFoodOtherMeat);
        this.availableFoodMeatSheepAndGoat = StringParser.parseAsNumber(raw.availableFoodMeatSheepAndGoat);
        this.availableFoodMeatPig = StringParser.parseAsNumber(raw.availableFoodMeatPig);
        this.availableFoodMeatPoultry = StringParser.parseAsNumber(raw.availableFoodMeatPoultry);
        this.availableFoodMeatBeef = StringParser.parseAsNumber(raw.availableFoodMeatBeef);
        this.availableFoodEggs = StringParser.parseAsNumber(raw.availableFoodEggs);
        this.availableFoodMilk = StringParser.parseAsNumber(raw.availableFoodMilk);
        this.availableFoodNuts = StringParser.parseAsNumber(raw.availableFoodNuts);
        this.availableFoodFruit = StringParser.parseAsNumber(raw.availableFoodFruit);
        this.availableFoodVegetables = StringParser.parseAsNumber(raw.availableFoodVegetables);
        this.availableFoodPulses = StringParser.parseAsNumber(raw.availableFoodPulses);
        this.availableFoodCerealsOther = StringParser.parseAsNumber(raw.availableFoodCerealsOther);
        this.availableFoodBarley = StringParser.parseAsNumber(raw.availableFoodBarley);
        this.availableFoodMaize = StringParser.parseAsNumber(raw.availableFoodMaize);
        this.availableFoodRice = StringParser.parseAsNumber(raw.availableFoodRice);
        this.availableFoodWheat = StringParser.parseAsNumber(raw.availableFoodWheat);

        this.foodGramsPerDayFruits = StringParser.parseAsNumber(raw.foodGramsPerDayFruits);
        this.foodGramsPerDayNonStarchyVegetables = StringParser.parseAsNumber(raw.foodGramsPerDayNonStarchyVegetables);
        this.foodGramsPerDayPotatoes = StringParser.parseAsNumber(raw.foodGramsPerDayPotatoes);
        this.foodGramsPerDayOtherStarchyVegetables = StringParser.parseAsNumber(
            raw.foodGramsPerDayOtherStarchyVegetables
        );
        this.foodGramsPerDayBeansAndLegumes = StringParser.parseAsNumber(raw.foodGramsPerDayBeansAndLegumes);
        this.foodGramsPerDayNutsAndSeeds = StringParser.parseAsNumber(raw.foodGramsPerDayNutsAndSeeds);
        this.foodGramsPerDayRefinedGrains = StringParser.parseAsNumber(raw.foodGramsPerDayRefinedGrains);
        this.foodGramsPerDayWholeGrains = StringParser.parseAsNumber(raw.foodGramsPerDayWholeGrains);
        this.foodGramsPerDayProcessedMeats = StringParser.parseAsNumber(raw.foodGramsPerDayProcessedMeats);
        this.foodGramsPerDayUnprocessedRedMeats = StringParser.parseAsNumber(raw.foodGramsPerDayUnprocessedRedMeats);
        this.foodGramsPerDaySeafoods = StringParser.parseAsNumber(raw.foodGramsPerDaySeafoods);
        this.foodGramsPerDayEggs = StringParser.parseAsNumber(raw.foodGramsPerDayEggs);
        this.foodGramsPerDayCheese = StringParser.parseAsNumber(raw.foodGramsPerDayCheese);
        this.foodGramsPerDayYoghurt = StringParser.parseAsNumber(raw.foodGramsPerDayYoghurt);
        this.foodGramsPerDaySugarSweetenedBeverages = StringParser.parseAsNumber(
            raw.foodGramsPerDaySugarSweetenedBeverages
        );
        this.foodGramsPerDayFruitJuices = StringParser.parseAsNumber(raw.foodGramsPerDayFruitJuices);
        this.foodGramsPerDayTea = StringParser.parseAsNumber(raw.foodGramsPerDayTea);
        this.foodGramsPerDaySaturatedFat = StringParser.parseAsNumber(raw.foodGramsPerDaySaturatedFat);

        this.percentageOfSchoolTimeSpentUsingDigitalDevices = StringParser.parseAsNumber(
            raw.percentageOfSchoolTimeSpentUsingDigitalDevices
        );

        this.pisaMathScore2003 = StringParser.parseAsNumber(raw.pisaMathScore2003);
        this.pisaMathScore2006 = StringParser.parseAsNumber(raw.pisaMathScore2006);
        this.pisaMathScore2009 = StringParser.parseAsNumber(raw.pisaMathScore2009);
        this.pisaMathScore2012 = StringParser.parseAsNumber(raw.pisaMathScore2012);
        this.pisaMathScore2015 = StringParser.parseAsNumber(raw.pisaMathScore2015);
        this.pisaMathScore2018 = StringParser.parseAsNumber(raw.pisaMathScore2018);
        this.pisaMathScore2022 = StringParser.parseAsNumber(raw.pisaMathScore2022)!;
        this.pisaReadingScore2003 = StringParser.parseAsNumber(raw.pisaReadingScore2003);
        this.pisaReadingScore2006 = StringParser.parseAsNumber(raw.pisaReadingScore2006);
        this.pisaReadingScore2009 = StringParser.parseAsNumber(raw.pisaReadingScore2009);
        this.pisaReadingScore2012 = StringParser.parseAsNumber(raw.pisaReadingScore2012);
        this.pisaReadingScore2015 = StringParser.parseAsNumber(raw.pisaReadingScore2015);
        this.pisaReadingScore2018 = StringParser.parseAsNumber(raw.pisaReadingScore2018);
        this.pisaReadingScore2022 = StringParser.parseAsNumber(raw.pisaReadingScore2022)!;
        this.pisaScienceScore2006 = StringParser.parseAsNumber(raw.pisaScienceScore2006);
        this.pisaScienceScore2009 = StringParser.parseAsNumber(raw.pisaScienceScore2009);
        this.pisaScienceScore2012 = StringParser.parseAsNumber(raw.pisaScienceScore2012);
        this.pisaScienceScore2015 = StringParser.parseAsNumber(raw.pisaScienceScore2015);
        this.pisaScienceScore2018 = StringParser.parseAsNumber(raw.pisaScienceScore2018);
        this.pisaScienceScore2022 = StringParser.parseAsNumber(raw.pisaScienceScore2022)!;
        this.pisaGeneralAverage2006 = StringParser.parseAsNumber(raw.pisaGeneralAverage2006);
        this.pisaGeneralAverage2009 = StringParser.parseAsNumber(raw.pisaGeneralAverage2009);
        this.pisaGeneralAverage2012 = StringParser.parseAsNumber(raw.pisaGeneralAverage2012);
        this.pisaGeneralAverage2015 = StringParser.parseAsNumber(raw.pisaGeneralAverage2015);
        this.pisaGeneralAverage2018 = StringParser.parseAsNumber(raw.pisaGeneralAverage2018);
        this.pisaGeneralAverage2022 = StringParser.parseAsNumber(raw.pisaGeneralAverage2022)!;
    }

    get pisaScores() {
        return {
            average: this.pisaGeneralAverageScore,
            math: this.pisaMathScore,
            reading: this.pisaReadingScore,
            science: this.pisaScienceScore,
        };
    }

    get skippedMeals() {
        if (this.skippedMealsNever == null) return null;

        return {
            never: this.skippedMealsNever!,
            oncePerWeek: this.skippedMealsOncePerWeek!,
            twoToThreePerWeek: this.skippedMealsTwoToThreePerWeek!,
            fourToFivePerWeek: this.skippedMealsFourToFivePerWeek!,
            always: this.skippedMealsAlways!,
        };
    }

    get skippedMealAtLeastOnce() {
        const skippedMealsData = this.skippedMeals;
        if (!skippedMealsData) return null;

        return (
            skippedMealsData.oncePerWeek +
            skippedMealsData.twoToThreePerWeek +
            skippedMealsData.fourToFivePerWeek +
            skippedMealsData.always
        );
    }

    get availableFood() {
        return {
            miscellaneous: this.availableFoodMiscellaneous,
            alcoholicBeverages: this.availableFoodAlcoholicBeverages,
            animalFats: this.availableFoodAnimalFats,
            vegetableOils: this.availableFoodVegetableOils,
            oilCrops: this.availableFoodOilCrops,
            fishAndSeafood: this.availableFoodFishAndSeafood,
            sugarCrops: this.availableFoodSugarCrops,
            sugarAndSweeteners: this.availableFoodSugarAndSweeteners,
            starchyRoots: this.availableFoodStarchyRoots,
            otherMeat: this.availableFoodOtherMeat,
            meatSheepAndGoat: this.availableFoodMeatSheepAndGoat,
            meatPig: this.availableFoodMeatPig,
            meatPoultry: this.availableFoodMeatPoultry,
            meatBeef: this.availableFoodMeatBeef,
            eggs: this.availableFoodEggs,
            milk: this.availableFoodMilk,
            nuts: this.availableFoodNuts,
            fruit: this.availableFoodFruit,
            vegetables: this.availableFoodVegetables,
            pulses: this.availableFoodPulses,
            cerealsOther: this.availableFoodCerealsOther,
            barley: this.availableFoodBarley,
            maize: this.availableFoodMaize,
            rice: this.availableFoodRice,
            wheat: this.availableFoodWheat,
        };
    }

    get foodInGrams() {
        // We always have either all the data or no data.
        if (this.foodGramsPerDayFruits == null) return null;

        return {
            fruits: this.foodGramsPerDayFruits!,
            vegetables:
                this.foodGramsPerDayNonStarchyVegetables! +
                this.foodGramsPerDayPotatoes! +
                this.foodGramsPerDayOtherStarchyVegetables!,
            grains: this.foodGramsPerDayRefinedGrains! + this.foodGramsPerDayWholeGrains!,
            beans: this.foodGramsPerDayBeansAndLegumes!,
            nuts: this.foodGramsPerDayNutsAndSeeds!,
            meats: this.foodGramsPerDayProcessedMeats! + this.foodGramsPerDayUnprocessedRedMeats!,
            seafoods: this.foodGramsPerDaySeafoods!,
            dairyAndEggs: this.foodGramsPerDayEggs! + this.foodGramsPerDayCheese! + this.foodGramsPerDayYoghurt!,
            sugaryDrinks: this.foodGramsPerDaySugarSweetenedBeverages! + this.foodGramsPerDayFruitJuices!,
            tea: this.foodGramsPerDayTea!,
        };
    }
}

export const data = jsonData.map((rawEntry, index) => {
    if (rawEntry.country === 'Cambodia') console.log(new CountryDatum(index, rawEntry));
    return new CountryDatum(index, rawEntry);
});

export const getDatumById = (id: CountryDatum['id']) => {
    return data[id];
};

let buket: Array<[string, number]> = [];
//buket[0] = new Array<[string, number]>(2);

let dataPointsCouter: number[] = new Array(Object.entries(data[0].availableFood).length).fill(0);

data.forEach((countryDatum) => {
    Object.entries(countryDatum.availableFood).forEach(buketFiller);

    function buketFiller(food: [string, number | null], index: number) {
        if (!buket[index]) {
            // Initialize the sub-array if it doesn't exist
            buket[index] = [food[0], 0];
        }

        const value = food[1] !== null ? food[1] : 0;
        if (value !== 0) {
            buket[index][1] += value;
            dataPointsCouter[index]++;
        }
    }
});

export const metaData = {
    totalCountries: data.length,
    pisaScores: {
        average: data.reduce((acc, c) => acc + c.pisaScores.average, 0) / data.length,
        math: data.reduce((acc, c) => acc + c.pisaScores.math, 0) / data.length,
        reading: data.reduce((acc, c) => acc + c.pisaScores.reading, 0) / data.length,
        science: data.reduce((acc, c) => acc + c.pisaScores.science, 0) / data.length,
        maxAverage: Math.max(...data.map((c) => c.pisaScores.average)),
        maxMath: Math.max(...data.map((c) => c.pisaScores.math)),
        maxReading: Math.max(...data.map((c) => c.pisaScores.reading)),
        maxScience: Math.max(...data.map((c) => c.pisaScores.science)),
    },
    nutrientList: data.map((countryDatum) => Object.entries(countryDatum.availableFood)),
    averageAvailableFood: buket.map((foodTotal, i) => {
        return [foodTotal[0], foodTotal[1] / dataPointsCouter[i]];
    }),

    globalAvailableFood: Object.fromEntries(
        Object.keys(data[0].availableFood).map((foodKey) => [
            foodKey,
            data.reduce((acc, c) => acc + ((c.availableFood as any)[foodKey] || 0), 0),
        ])
    ),
};