
export const timeAgo = (isoDateString)=> {
    const date = new Date(isoDateString);
    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} secs ago`;
    }

    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
        return `${minutesPast} mins ago`;
    }

    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
        return `${hoursPast} hrs ago`;
    }

    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 7) {
        return `${daysPast} days ago`;
    }

    const weeksPast = Math.floor(daysPast / 7);
    if (weeksPast < 4) {
        return `${weeksPast} weeks ago`;
    }

    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
        return `${monthsPast} months ago`;
    }

    const yearsPast = Math.floor(daysPast / 365);
    return `${yearsPast} years ago`;
}