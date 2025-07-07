export const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
    }).format(value);
};

export const bangladeshiCurrencyFormatter = (value: number) => {
    const formattedValue = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(value);
    return `${formattedValue} Taka`;
};
