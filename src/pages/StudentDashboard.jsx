import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.first_name}</h1>

      <div className="mt-4">
        <p>
          <strong>Admission Number:</strong> {user.admission_number}
        </p>
        <p>
          <strong>Class:</strong> {user.class_assigned}
        </p>
        <p>
          <strong>Session:</strong> {user.session}
        </p>
      </div>

      <div className="mt-6">
        <a
          href={user.admission?.receipt_url}
          target="_blank"
          className="text-blue-600 underline"
        >
          Download Receipt
        </a>
      </div>
    </div>
  );
}
