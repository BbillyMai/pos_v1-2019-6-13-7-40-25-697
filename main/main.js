'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释

const allItems = loadAllItems();
const promotions = loadPromotions();

function printReceipt(tags) {

    let countedItem = countItems(tags);

    let receiptItems = item2ReceiptItems(countedItem);

    let spare = calculatePromotions(receiptItems);

    let receipt = createReceipt(receiptItems, spare);

    console.log(receipt);
}

function countItems(tags) {

    let countedItem = tags.reduce((items, tag) => {
        const index = tag.indexOf("-");

        if (index > 0) {
            if (tag.substring(0, index) in items) {
                items[tag.substring(0, index)] = items[tag.substring(0, index)] + parseFloat(tag.substring(index + 1, tag.length));
            } else {
                items[tag.substring(0, index)] = parseFloat(tag.substring(index + 1, tag.length));
            }
            return items;
        } else {
            if (tag in items) {
                items[tag] = items[tag] + 1;
            } else {
                items[tag] = 1;
            }
            return items;
        }

    }, {});
    return countedItem;
}

function item2ReceiptItems(countedItem) {
    let items = [];
    for (let i in countedItem) {
        allItems.forEach(obj => {
            if (obj.barcode == i) {
                items.push({
                    barcode: i,
                    name: obj.name,
                    unit: obj.unit,
                    price: obj.price,
                    count: countedItem[i],
                    subTotal: obj.price * countedItem[i]
                })
            }
        });
    }
    return items;
}

function calculatePromotions(receiptItems) {
    // calculatePromotions
    let spare = 0;
    receiptItems.forEach(item => {
        promotions[0].barcodes.forEach(barcode => {
            if (barcode == item.barcode) {
                if (item.count >= 2) {
                    let times = parseInt(item.count / 3);
                    item.subTotal -= item.price * times;
                    spare += item.price * times;
                }
            }
        })
    })
    return spare;
}

function createReceipt(receiptItems, spare) {

    let receipt = `***<没钱赚商店>收据***\n`;
    let total = 0;
    receiptItems.forEach(item => {
        receipt += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${item.subTotal.toFixed(2)}(元)\n`;
        total += item.subTotal;
    });
    receipt += `----------------------\n`;
    receipt += `总计：${total.toFixed(2)}(元)\n`;
    receipt += `节省：${spare.toFixed(2)}(元)\n`;
    receipt += `**********************`;
    return receipt;
}