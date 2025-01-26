import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Bracket from "@/temp_bracket"
import { PlayerSection } from "./player_section"


export function TournamentTable() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bracket">Bracket</TabsTrigger>
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="livestream">Livestream</TabsTrigger>
      </TabsList>

      <TabsContent value="bracket">
            <Bracket />
      </TabsContent>

      <TabsContent value="players">
            <PlayerSection />
      </TabsContent>

      <TabsContent value="livestream">
            Livestream
      </TabsContent>
    </Tabs>
  )
}
