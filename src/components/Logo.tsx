function Logo({ height = 10 }: { height: number }) {
  return <img src="/ink.svg" alt="Ink Logo" className={`h-${height}`} />;
}

export default Logo;
