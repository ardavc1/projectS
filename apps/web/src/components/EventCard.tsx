type EventCardProps = {
    title: string;
    date: string;
    location: string;
    organizer: string;
    imageUrl: string;
  };
  
  export default function EventCard({
    title,
    date,
    location,
    organizer,
    imageUrl,
  }: EventCardProps) {
    return (
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 border border-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-md w-full h-40 object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-1">📅 {date}</p>
        <p className="text-sm text-text-secondary mb-1">📍 {location}</p>
        <p className="text-sm text-text-secondary text-right italic">
          Organizator: {organizer}
        </p>
      </div>
    );
  }
  