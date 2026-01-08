import Image from "next/image";

export function Header() {
  return (
    <header className="text-center mb-12 flex flex-col items-center gap-6">
      <div>
        <Image src="/logo.png" alt="Usemarqia Logo" width={250} height={64} />
      </div>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Upload a product image or paste an image URL—generate marketing content
        instantly.
      </p>
    </header>
  );
}
