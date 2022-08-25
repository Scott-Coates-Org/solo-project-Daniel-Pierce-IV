export default function BaseForm({ children, heading, subheading, onSubmit }) {
  function preventDefaultThenResubmit(event) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <form
      action=""
      className="relative flex flex-col w-[40ch] gap-4"
      onSubmit={preventDefaultThenResubmit}
      noValidate
    >
      <header className="flex flex-col gap-2">
        <h2 className="text-4xl text-center font-bold">{heading}</h2>

        {subheading && <h3 className="text-center">{subheading}</h3>}
      </header>

      {children}
    </form>
  );
}
