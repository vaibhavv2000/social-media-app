import {Component,Fragment,ReactNode} from "react";

interface props {
  children: ReactNode;
}

interface states {
  error: boolean;
}

export class ErrorBoundary extends Component<props,states> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.log("error",error);
    return {error: true};
  }

  render() {
    return (
      <Fragment>
        <div className="h-screen w-full">
          <img
            src="https://img.freepik.com/free-vector/404-error-with-person-looking-clues-concept-illustration_114360-7902.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </Fragment>
    );
  }
}

export default ErrorBoundary;
