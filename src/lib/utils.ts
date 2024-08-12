import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'
import { EntityError } from './http'
import { levels } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      })
    })
  } else {
    toast.error(error?.payload?.message ?? 'Lỗi không xác định', { duration: duration ?? 5000 })
  }
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

/**
 * Renders an array of page numbers based on the current page, total pages, and maximum display.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param maxDisplay - The maximum number of pages to display. Defaults to 5.
 * @returns An array of page numbers.
 */
export const renderPages = (currentPage: number, totalPages: number, maxDisplay: number = 5) => {
  // Xác định khoảng các trang hiển thị
  const halfRange = Math.floor(maxDisplay / 2)
  let startPage = Math.max(1, currentPage - halfRange)
  let endPage = Math.min(totalPages, currentPage + halfRange)

  // Điều chỉnh lại nếu số lượng trang hiển thị ít hơn maxDisplay
  if (endPage - startPage + 1 < maxDisplay) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxDisplay - 1)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxDisplay + 1)
    }
  }

  // Tạo mảng các số trang
  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
}

/**
 * Calculates the level progress based on the given points.
 * @param points - The number of points.
 * @returns The level progress as a percentage.
 */
export const calculateLevelProgress = (points: number) => {
  let currentLevel = levels[0]
  let nextLevel = null

  // Tìm level hiện tại và level tiếp theo
  for (let i = 0; i < levels.length; i++) {
    if (points >= levels[i].points) {
      currentLevel = levels[i]
      nextLevel = levels[i + 1] || null // Nếu không có level tiếp theo, trả về null
    }
  }

  if (!nextLevel) {
    // Nếu đã đạt cấp độ tối đa
    return 100
  }

  // Tính phần trăm level hiện tại đã đạt được
  const levelProgress = ((points - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100

  return levelProgress
}
