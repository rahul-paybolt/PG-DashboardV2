import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/react";

interface ErrorMessageProps {
  errorMessage: React.ReactNode;
}
const ErrorHandlerMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <Card className="flex items-center justify-center">
      <CardBody>
        <p className="text-danger-400">{errorMessage}</p>
        <Spinner color="danger" />
      </CardBody>
    </Card>
  );
};

export default ErrorHandlerMessage;
