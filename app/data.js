const observableModule = require("data/observable");

function init() {
    const data = observableModule.fromObject({
        name: '',

        categories: ['Nuoc hoa', 'My pham'],
        categoryValues: ['perfume', 'cosmetics'],
        category: 0,
        categoryValue: 'perfume',
        categoryLabel: 'Nuoc hoa',

        price: '',

        profits: ['0', '50k', '100k', '200k', '300k', '500k', '1tr'],
        profitValues: [0, 50000, 100000, 200000, 300000, 500000, 1000000],
        profit: 3,
        profitValue: 200000,
        profitLabel: '200k',

        taxes: ['0%', '5%', '6%', '7.5%', '10%'],
        taxValues: [1, 1.05, 1.06, 1.075, 1.1],
        tax: 0,
        taxValue: 1,
        taxLabel: '0%',

        volumes: ['30ml', '50ml', '75ml', '90ml', '100ml', '125ml', '150ml', '200ml', '500ml'],
        volumeValues: [30, 50, 75, 90, 100, 125, 150, 200, 500],
        volume: 4,
        volumeValue: 100,
        volumeLabel: '100ml',
        volumeVisibility: '',

        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        sizeValues: [0.25, 0.5, 1, 1.5, 2],
        size: 2,
        sizeValue: 0.5,
        sizeLabel: 'M',
        sizeVisibility: 'collapsed',

        final: '250,000 VND',
        printTitle: '',
        printValue: '450,000 VND'
    });

    data.on('propertyChange', (event) => {
        if (event.propertyName == 'final') return;
        if (event.propertyName == 'taxLabel') return;
        if (event.propertyName == 'taxValue') return;
        if (event.propertyName == 'volumeLabel') return;
        if (event.propertyName == 'volumeValue') return;
        if (event.propertyName == 'volumeVisibility') return;
        if (event.propertyName == 'sizeLabel') return;
        if (event.propertyName == 'sizeValue') return;
        if (event.propertyName == 'sizeVisibility') return;
        if (event.propertyName == 'categoryLabel') return;
        if (event.propertyName == 'categoryValue') return;
        if (event.propertyName == 'profitLabel') return;
        if (event.propertyName == 'profitValue') return;
        if (event.propertyName == 'printTitle') return;
        if (event.propertyName == 'printValue') return;
        if (event.propertyName == 'photo') return;

        let price = parseInt(data.price, 10);
        price = isNaN(price) ? 0 : price;

        const tax = data.taxValues[data.tax];
        const taxLabel = data.taxes[data.tax];
        if (data.taxLabel != taxLabel) {
            data.taxLabel = taxLabel;
        }
        if (data.taxValue != tax) {
            data.taxValue = tax;
        }

        const volume = data.volumeValues[data.volume];
        const volumeLabel = data.volumes[data.volume];
        if (data.volumeLabel != volumeLabel) {
            data.volumeLabel = volumeLabel;
        }
        if (data.volumeValue != volume) {
            data.volumeValue = volume;
        }

        const size = data.sizeValues[data.size];
        const sizeLabel = data.sizes[data.size];
        if (data.sizeLabel != sizeLabel) {
            data.sizeLabel = sizeLabel;
        }
        if (data.sizeValue != size) {
            data.sizeValue = size;
        }

        const category = data.categoryValues[data.category];
        const categoryLabel = data.categories[data.category];
        if (data.categoryLabel != categoryLabel) {
            data.categoryLabel = categoryLabel;
        }
        if (data.categoryValue != category) {
            data.categoryValue = category;
        }
        let weight = 0;
        let custom = 0;
        switch (category) {
            case 'perfume':
                weight = volume / 100;
                custom = 5;
                data.volumeVisibility = '';
                data.sizeVisibility = 'collapsed';
                data.printTitle = `${data.name} (${data.volumeLabel})`;
                break;
            default:
                weight = size;
                custom = 2.5 * weight;
                data.volumeVisibility = 'collapsed';
                data.sizeVisibility = '';
                data.printTitle = data.name;
        }

        const shipping = Math.ceil(weight * 5);

        const usd = price * tax + custom + shipping;
        const vnd = (Math.ceil((usd * 2.33 / 5)) * 50000);
        const final = friendlyVND(vnd);
        if (data.final != final) {
            data.final = final;
        }

        const profit = data.profitValues[data.profit];
        const profitLabel = data.profits[data.profit];
        if (data.profitLabel != profitLabel) {
            data.profitLabel = profitLabel;
        }
        if (data.profitValue != profit) {
            data.profitValue = profit;
        }

        const printValue = friendlyVND(vnd + profit);
        if (data.printValue != printValue) {
            data.printValue = printValue;
        }

    });
    return data;
}
module.exports = init();

function friendlyVND(value) {
    const text = value + '';

    const tokens = [];
    let i;
    for (i = text.length - 3; i > 0; i -= 3) {
        tokens.unshift(text.substr(i, 3));
    }
    tokens.unshift(text.substring(0, i + 3));
    return tokens.join(',') + ' VND';
}
