export default function Form() {
  return <form onSubmit={onSubmit}>{children}</form>;
}

function Label({ children, className }) {
  return <label> {children} </label>;
}

function Input() {
  return <input />;
}

function ErrorMessage() {
  return <span>{children}</span>;
}

Form.Label = Label;
Form.Input = Input;
Form.ErrorMessage = ErrorMessage;
