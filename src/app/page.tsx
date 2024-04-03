import Image from 'next/image';

export default function Home() {
  return (
    <div className="absolute top-0 left-0 h-svh w-full">
      <Image
        src="/backgrounds/home-bg.jpg"
        alt="garage"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority
        quality="100"
      />
    </div>
  );
}
