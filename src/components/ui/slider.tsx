import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function Slider() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
      </TabsList>
      <TabsContent value="players">
        Search for players here.
        <div className="space-y-1">
          <Input id="input_profile" placeholder="Players" />
        </div>
      </TabsContent>

      <TabsContent value="tournaments">
              Search for tournaments here.
            <div className="space-y-1">
              <Input id="input_tournament" placeholder="Tournaments"/>
            </div>
      </TabsContent>
    </Tabs>
  )
}
