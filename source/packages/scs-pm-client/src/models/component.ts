export type MinimalComponentProps = {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

// FaCC = Function as child component
interface HasChildren<TOutput> {
  children: (props: TOutput) => React.ReactNode
}
export type FaCC<TProps, TOutput> = React.FC<TProps & HasChildren<TOutput>>
