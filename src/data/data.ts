import jsonData from './data.json';
import { StringParser } from './StringParser';

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
}

export const data = jsonData.map((rawEntry, index) => {
    if (rawEntry.country === 'Cambodia') console.log(new CountryDatum(index, rawEntry));
    return new CountryDatum(index, rawEntry);
});

export const getDatumById = (id: CountryDatum['id']) => {
    return data[id];
};

const averageAvailableFood = {};

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
};

const nutrientList = data.map((countryDatum) => Object.entries(countryDatum.availableFood));
/*
0: Array(25)
    0: ['food', ###]
    i: ['n', ###]
*/

//const averageMiscellaneous = nutrientList.reduce(nutrientsReducer, 0);

/*data.forEach((countryDatum) => {
    Object.entries(countryDatum.availableFood).forEach(([food, value]) => {
        //availableFood[food] ??= 0;
        //availableFood[food] += value;
    });
});

function nutrientsReducer(accumulator: number, currentValue: Array<[string, number | null]>) {
    if (currentValue[0][1] === null) return accumulator;
    return (accumulator += currentValue[0][1]);
}

/*
averageAvailableFood = [ ["miscellaneous", 123.1], ["...", ###]  ]

*/
