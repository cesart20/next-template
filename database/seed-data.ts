interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: asdasdasdasdasdasdasd',
            status: 'pending',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Progress: asdasdasdasdasdasdasd',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finish: asdasdasdasdasdasasdasdasdasddasdasd',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}