import ImageEditPage from '@/components/ImageEditPage'
import GlobalBackground from '@/components/GlobalBackground'

export default function ImageEdit() {
  return (
    <>
      <GlobalBackground />
      <main className="min-h-screen pt-16">
        <ImageEditPage />
      </main>
    </>
  )
}
