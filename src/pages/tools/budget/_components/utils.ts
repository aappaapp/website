export function formatMoney(value: number) {
    return value >= 0 ? `$${value}` : `-$${value}`;
}
