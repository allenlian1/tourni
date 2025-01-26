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
    <Tabs defaultValue="account">
      <TabsList className="flex w-full flex-wrap sm:flex-nowrap gap-2 justify-center">
        <TabsTrigger value="bracket" className="flex-1 text-center sm:w-auto">
          Bracket
        </TabsTrigger>
        <TabsTrigger value="players" className="flex-1 text-center sm:w-auto">
          Players
        </TabsTrigger>
        <TabsTrigger value="livestream" className="flex-1 text-center sm:w-auto">
          Livestream
        </TabsTrigger>
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
