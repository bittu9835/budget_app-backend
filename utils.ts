import moment from "moment";

export const getLastMonths = (num = 12, format = "MMM") => {
    let months: any = [];
    for (let i = 11; i >= 0; i--) {
        const currentDate = moment();
        currentDate.subtract(i, 'months');
        months.push({
            monthName: currentDate.format(format),
            month: currentDate.format('MM')
        })
        console.log(months)
    }
    return months;
}

export function getRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', 'sky', 'Purple', 'Black', 'Brown','Gray'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor: string = colors[randomIndex];
    const rgbaColor = colorToRGBA(selectedColor);
    return rgbaColor;
}
function colorToRGBA(color: string): any {
    const colorMap: any = {
        red: '255,155,155',
        green: '164,212,163',
        blue: '54, 162, 235',
        yellow: '238,215,161',
        pink: '255,102,136',
        orange: '223,145,82',
        sky: '80,184,231',
        Purple: '153, 102, 255',
        Black: '59,68,75',
        Brown: '163,87,58',
        Gray:'101,119,134'
    };
    return colorMap[color] || '0, 0, 0';
}