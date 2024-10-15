type ButtonProps = {
  label: string
  url: string
  type: "primary" | "secondary"
}

const Button: React.FC<ButtonProps> = ({ label, url, type = "primary" }) => {
  return (
    url && (
      <a
        className={`py-2 px-4 w-fit rounded-2xl font-bold uppercase cursor-pointer border-2 border-primary hover:border-primary-50 transition-all ${type === "primary" ? "bg-primary text-white hover:bg-primary-50" : "text-primary"}`}
        href={url}
      >
        {label}
      </a>
    )
  )
}

export { Button }
