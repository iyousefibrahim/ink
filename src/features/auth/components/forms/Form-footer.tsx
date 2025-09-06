import { Link } from "react-router";

function Formfooter({
  title,
  Linkto,
  msg,
}: {
  title: string;
  Linkto: string;
  msg: string;
}) {
  return (
    <div className="text-center text-sm">
      {msg}{" "}
      <Link
        to={Linkto}
        className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
      >
        {title}
      </Link>
    </div>
  );
}

export default Formfooter;
