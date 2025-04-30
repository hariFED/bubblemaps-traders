"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  contract: z
    .string()
    .min(1, "Contract address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address format"),
  chain: z.string().min(1, "Chain is required"),
})

export function SearchForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contract: "",
      chain: "bsc",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      router.push(`/visualize/${values.chain}/${values.contract}`)
    } catch (error) {
      console.error("Navigation error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockchain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="eth">Ethereum</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                      <SelectItem value="poly">Polygon</SelectItem>
                      <SelectItem value="arbi">Arbitrum</SelectItem>
                      <SelectItem value="sol">Solana</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="avax">AVAX</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-[#090015]" disabled={isSubmitting}>
              {isSubmitting ? (
                "Loading..."
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" /> Visualize Network
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
