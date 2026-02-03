
const builtInCategories = {
    sports: {
        name: "Sports",
        sets: [
            ["Football", "Basketball", "Tennis", "Baseball", "Hockey"],
            ["Swimming", "Diving", "Surfing", "Kayaking", "Rowing"],
            ["Boxing", "Wrestling", "Karate", "Judo", "Taekwondo"],
            ["Golf", "Bowling", "Archery", "Darts", "Billiards"],
            ["Soccer", "Rugby", "Cricket", "Volleyball", "Badminton"],
        ]
    },
    celebrities: {
        name: "Celebrities",
        sets: [
            ["Actor", "Singer", "Dancer", "Comedian", "Director"],
            ["Beyoncé", "Taylor Swift", "Rihanna", "Adele", "Lady Gaga"],
            ["Tom Hanks", "Leonardo DiCaprio", "Brad Pitt", "Denzel Washington", "Morgan Freeman"],
            ["Obama", "Trump", "Modi", "Putin", "Kim Jong Un"],
            ["Oprah", "Ellen", "Jimmy Fallon", "Jimmy Kimmel", "Conan"],
            ["Messi", "Ronaldo", "LeBron", "Serena Williams", "Usain Bolt"],
        ]
    },
    food: {
        name: "Food",
        sets: [
            ["Pizza", "Burger", "Hotdog", "Taco", "Sandwich"],
            ["Sushi", "Ramen", "Pad Thai", "Curry", "Dim Sum"],
            ["Apple", "Banana", "Orange", "Grape", "Strawberry"],
            ["Chocolate", "Ice Cream", "Cake", "Cookie", "Brownie"],
            ["Coffee", "Tea", "Juice", "Smoothie", "Milkshake"],
        ]
    },
    places: {
        name: "Places",
        sets: [
            ["Beach", "Mountain", "Forest", "Desert", "Island"],
            ["Hospital", "School", "Airport", "Mall", "Stadium"],
            ["Paris", "London", "Tokyo", "New York", "Sydney"],
            ["Restaurant", "Cafe", "Bar", "Club", "Theater"],
            ["Library", "Museum", "Zoo", "Aquarium", "Park"],
        ]
    },
    animals: {
        name: "Animals",
        sets: [
            ["Dog", "Cat", "Rabbit", "Hamster", "Guinea Pig"],
            ["Lion", "Tiger", "Elephant", "Giraffe", "Zebra"],
            ["Eagle", "Owl", "Parrot", "Penguin", "Flamingo"],
            ["Shark", "Dolphin", "Whale", "Octopus", "Jellyfish"],
            ["Snake", "Lizard", "Crocodile", "Turtle", "Frog"],
        ]
    },
    movies: {
        name: "Movies",
        sets: [
            ["Titanic", "Avatar", "Inception", "Interstellar", "Gladiator"],
            ["Harry Potter", "Lord of the Rings", "Star Wars", "Marvel", "DC"],
            ["Horror", "Comedy", "Drama", "Action", "Romance"],
            ["Pixar", "Disney", "DreamWorks", "Ghibli", "Marvel"],
            ["Joker", "Batman", "Spider-Man", "Iron Man", "Superman"],
        ]
    },
    professions: {
        name: "Professions",
        sets: [
            ["Doctor", "Nurse", "Surgeon", "Dentist", "Pharmacist"],
            ["Lawyer", "Judge", "Police", "Detective", "Firefighter"],
            ["Teacher", "Professor", "Principal", "Tutor", "Counselor"],
            ["Chef", "Waiter", "Bartender", "Baker", "Barista"],
            ["Pilot", "Flight Attendant", "Captain", "Sailor", "Driver"],
        ]
    },
    objects: {
        name: "Objects",
        sets: [
            ["Phone", "Laptop", "Tablet", "Watch", "Camera"],
            ["Chair", "Table", "Sofa", "Bed", "Desk"],
            ["Book", "Magazine", "Newspaper", "Notebook", "Diary"],
            ["Umbrella", "Sunglasses", "Hat", "Scarf", "Gloves"],
            ["Key", "Lock", "Door", "Window", "Mirror"],
        ]
    },
    bollywood: {
        name: "Bollywood",
        sets: [
            // Actor + iconic roles
            ["Shah Rukh Khan", "Raj Malhotra", "Rahul", "Aman"],
            ["Aamir Khan", "Rancho", "PK", "Mahavir Singh Phogat"],
            ["Salman Khan", "Prem", "Chulbul Pandey", "Radhe"],
            ["Hrithik Roshan", "Rohit Mehra", "Krrish", "Ved"],
            ["Ranbir Kapoor", "Jordan", "Bunny", "Barfi"],

            ["Shah Rukh Khan", "Aamir Khan", "Salman Khan", "Hrithik Roshan", "Ranbir Kapoor", "Ajay Devgn", "Deepika Padukone", "Alia Bhatt", "Kareena Kapoor", "Priyanka Chopra", "Katrina Kaif", "Anushka Sharma"],


            // Movies of same actor / similar vibe
            ["DDLJ", "Kuch Kuch Hota Hai", "Kal Ho Naa Ho", "Veer-Zaara"],
            ["3 Idiots", "PK", "Dangal", "Taare Zameen Par"],
            ["Rockstar", "Aashiqui 2", "Kabir Singh", "Tamasha"],
            ["Bajrangi Bhaijaan", "Sultan", "Kick", "Tiger Zinda Hai"],
            ["Padmaavat", "Bajirao Mastani", "Ram-Leela", "Jodhaa Akbar"]
        ]
    },
    cricket: {
        name: "Cricket",
        sets: [
            // Formats
            ["Test Cricket", "ODI", "T20", "World Cup", "IPL"],

            // Indian players
            ["Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Rohit Sharma", "Rahul Dravid"],
            ["Kapil Dev", "Sunil Gavaskar", "Anil Kumble", "Sourav Ganguly", "VVS Laxman"],

            // Cricket roles
            ["Batsman", "Bowler", "All-Rounder", "Wicket Keeper", "Captain"],

            // Shots / actions
            ["Cover Drive", "Pull Shot", "Sweep", "Yorker", "Bouncer"],

            // Tournaments / teams
            ["IPL", "World Cup", "Champions Trophy", "Asia Cup", "Test Series"]
        ]
    },
    football: {
        name: "Football",
        sets: [
            // Players
            ["Messi", "Ronaldo", "Neymar", "Mbappe", "Haaland"],
            ["Pele", "Maradona", "Zidane", "Ronaldinho", "Beckham"],

            // Positions
            ["Goalkeeper", "Defender", "Midfielder", "Winger", "Striker"],

            // Clubs
            ["Barcelona", "Real Madrid", "Manchester United", "Bayern Munich", "PSG", "Chelsea", "Arsenal", "Liverpool", "AC Milan", "Juventus"],

            // Tournaments
            ["World Cup", "Champions League", "Europa League", "Copa America", "Euro Cup"]
        ]
    },
    hindiSongsSingers: {
        name: "Hindi Songs & Singers",
        sets: [
            // Male singers
            ["Arijit Singh", "Atif Aslam", "Sonu Nigam", "KK", "Shaan"],

            // Female singers
            ["Shreya Ghoshal", "Sunidhi Chauhan", "Neha Kakkar", "Alka Yagnik", "Lata Mangeshkar"],

            // Romantic songs
            ["Tum Hi Ho", "Raabta", "Agar Tum Saath Ho", "Janam Janam", "Hawayein"],

            // Party songs
            ["Kala Chashma", "Badtameez Dil", "Ghungroo", "Nashe Si Chadh Gayi", "Abhi Toh Party Shuru Hui Hai"],

            // Sad songs
            ["Channa Mereya", "Tadap Tadap", "Phir Le Aaya Dil", "Jeena Je'na", "Agar Tum Saath Ho"]
        ]
    },
    iiit: {
        name: "IIIT",
        sets: [
            ["ETC", "EEE", "CSEA", "CSEB", "IT", "CE"],
            ["Pradyut", "SP Singh", "AK Dash", "Tushar Ranjan", "AK Sahu"],
            ["Tech Society", "TARS", "Paracosm", "FLUX", "Vedanta", "E-Cell"],
            ["Gym", "Open Space", "Stationery", "Library", "Placement Cell", "Basketball Court"],
            ["D Block", "E Block", "P BLock", "L Block", "K Block", "Q Block"]
        ]
    },
    indianFood: {
        name: "Indian Food",
        sets: [
            // North Indian main course
            ["Butter Chicken", "Paneer Butter Masala", "Shahi Paneer", "Kadai Chicken", "Dal Makhani"],

            // South Indian dishes
            ["Dosa", "Idli", "Vada", "Uttapam", "Pongal"],

            // Street food
            ["Pani Puri", "Bhel Puri", "Sev Puri", "Aloo Chaat", "Dahi Puri"],

            // Rice-based dishes
            ["Biryani", "Pulao", "Fried Rice", "Khichdi", "Jeera Rice"],

            // Breads
            ["Roti", "Naan", "Paratha", "Kulcha", "Bhatura"],

            // Snacks
            ["Samosa", "Kachori", "Pakora", "Cutlet", "Bread Roll"],

            // Sweets
            ["Gulab Jamun", "Rasgulla", "Jalebi", "Barfi", "Ladoo"],

            // Regional dishes
            ["Chole Bhature", "Rajma Chawal", "Vada Pav", "Pav Bhaji", "Dhokla"],

            // Chaats
            ["Papdi Chaat", "Aloo Tikki", "Ragda Pattice", "Samosa Chaat", "Chana Chaat"],

            // Beverages
            ["Masala Chai", "Lassi", "Buttermilk", "Filter Coffee", "Sugarcane Juice"]
        ]
    },
    indianCelebritiesOther: {
        name: "Indian Celebrities (Other)",
        sets: [
            [
                // Business / Entrepreneurs
                "Ratan Tata", "Mukesh Ambani", "Gautam Adani", "Nandan Nilekani", "Vijay Shekhar Sharma",

                // Politicians
                "Narendra Modi", "Amit Shah", "Rahul Gandhi", "Arvind Kejriwal", "S Jaishankar",

                // Sports (non-cricket)
                "Neeraj Chopra", "PV Sindhu", "Mary Kom", "Sania Mirza", "Abhinav Bindra",

                // Tech / Education / Science
                "APJ Abdul Kalam", "CNR Rao", "Raghuram Rajan", "Sundar Pichai", "Satya Nadella",

                // Content creators / public figures
                "CarryMinati", "Bhuvan Bam", "Ashish Chanchlani", "BeerBiceps", "Technical Guruji"
            ]
        ]
    },


};


const loadCustomCategories = () => {
    try {
        const saved = localStorage.getItem('wordImposterCustomCategories');
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.error('Failed to load custom categories:', e);
        return {};
    }
};


export const saveCustomCategories = (customCategories) => {
    try {
        localStorage.setItem('wordImposterCustomCategories', JSON.stringify(customCategories));
    } catch (e) {
        console.error('Failed to save custom categories:', e);
    }
};


export const getAllCategories = () => {
    const custom = loadCustomCategories();
    return { ...builtInCategories, ...custom };
};


export const categories = getAllCategories();

export const getCategoryList = () => Object.keys(getAllCategories());

export const getCategoryByKey = (key) => getAllCategories()[key];

export const getCustomCategories = () => loadCustomCategories();

export const isCustomCategory = (key) => {
    const custom = loadCustomCategories();
    return key in custom;
};

export const addCustomCategory = (key, name, sets) => {
    const custom = loadCustomCategories();
    custom[key] = { name, sets, isCustom: true };
    saveCustomCategories(custom);
};

export const deleteCustomCategory = (key) => {
    const custom = loadCustomCategories();
    delete custom[key];
    saveCustomCategories(custom);
};

export const updateCustomCategory = (key, name, sets) => {
    const custom = loadCustomCategories();
    if (custom[key]) {
        custom[key] = { name, sets, isCustom: true };
        saveCustomCategories(custom);
    }
};
