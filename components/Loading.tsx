interface LoadingProps{
  text:string
}
export default function Loading({text}:LoadingProps) {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center">
      <div className="relative animate-pulse ">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Prime
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
