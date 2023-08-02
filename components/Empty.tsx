import Image from "next/image";

interface EmptyProps {
  lable: string;
}
export default function Empty({ lable }: EmptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center">
      <div className="relative w-72 h-72">
        <Image src="/empty.jpg" alt="empty" fill />
      </div>
      <p className="text-muted-foreground text-sm text-center">{lable}</p>
    </div>
  );
}
