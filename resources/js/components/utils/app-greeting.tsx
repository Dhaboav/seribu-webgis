export default function Greeting() {
    const hour = new Date().getHours();
    let message = 'Selamat Malam';
    if (hour >= 5 && hour < 10) message = 'Selamat Pagi';
    else if (hour >= 10 && hour < 15) message = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) message = 'Selamat Sore';

    return <>{message}</>;
}
