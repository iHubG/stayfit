

interface Props {
  greeting: string;
  name?: string;
  message: string;
}

export default function WelcomeSection({ greeting, name, message }: Props) {
  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        {greeting}{name ? `, ${name}` : ""}!
      </h1>
      <p className="text-gray-600 text-sm">{message}</p>

    </section>
  );
}
