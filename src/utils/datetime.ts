export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;

export const getTimeToString  = (date: string): string => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const lastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    const inputTime = `${inputDate.getHours().toString().padStart(2, "0")}:${inputDate.getMinutes().toString().padStart(2, "0")}`;

    return (
        (currentDate.getDate() === inputDate.getDate() 
        ? "Сегодня,"
        : (
            lastDate.getDate() === inputDate.getDate()
                ? "Вчера,"
                : inputDate.toLocaleDateString()
        )) + " " + inputTime
    );
};