
export interface ICardProps {
  title: string
  subtitle: string
  img: string
  tags?: string[]
  onClick?: () => void
  buttonText?: string
  disabled?: boolean
  secondOnClick?: () => void
  secondButtonText?: string
  secondDisabled?: boolean
}