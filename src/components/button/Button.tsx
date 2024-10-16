type ButtonProps = {
  label: string
  url?: string
  buttonStyle: "primary" | "secondary"
}

const Button: React.FC<ButtonProps> = ({
  label,
  url,
  buttonStyle = "primary",
  ...props
}) => {
  return (
    <div
      className={`py-2 px-4 w-fit rounded-2xl font-bold uppercase cursor-pointer border-2 border-primary hover:border-primary-50 transition-all ${buttonStyle === "primary" ? "bg-primary text-white hover:bg-primary-50" : "text-primary"}`}
    >
      {url ? (
        <a href={url} {...props}>
          {label}
        </a>
      ) : (
        <button {...props}>{label}</button>
      )}
    </div>
  )
}

export { Button }
