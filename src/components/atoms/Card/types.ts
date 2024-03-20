
export interface ICardProps {
  title: string
  subtitle: string
  img: string
  tags?: string[]
  onClick?: () => void
  buttonText?: string
}