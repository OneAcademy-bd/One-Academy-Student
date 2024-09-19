import { useState } from "react"

import ProfileEditMode from "./ProfileEditMode"
import ProfileViewMode from "./ProfileViewMode"

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  return (
    <> {/* change width here */}
      {isEditMode && <ProfileEditMode setIsEditMode={setIsEditMode} />}
      {!isEditMode && <ProfileViewMode setIsEditMode={setIsEditMode} />}
    </>
  )
}
