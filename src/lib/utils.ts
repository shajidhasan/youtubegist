export const extractVideoId = (url: string) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

export const timeAgo = (dateString: string): string => {
    const now = new Date().getTime();
    const date = new Date(dateString).getTime();
    const diff = now - date;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (diff < minute) {
        return 'just now';
    } else if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diff < week) {
        const days = Math.floor(diff / day);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diff < month) {
        const weeks = Math.floor(diff / week);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (diff < year) {
        const months = Math.floor(diff / month);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diff / year);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
}
