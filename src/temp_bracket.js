import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useWindowSize } from "@uidotdev/usehooks";
import React from 'react';

export default function Bracket() {
    return <SingleElimination />;
  }
  
export const SingleElimination = () => {
 const size = useWindowSize();
  const finalWidth = Math.max(size.width - 50, 500);
  const finalHeight = Math.max(size.height - 100, 500);
  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          width={finalWidth}
          height={finalHeight}
          background="rgb(11, 13, 19)"
          SVGBackground="rgb(11, 13, 19)"
          {...props}
        >
          {children}
        </SVGViewer>
      )}
      onMatchClick={(match) => console.log(match)}
      onPartyClick={(match) => console.log(match)}
    />
  );
} 
  
  export const simpleSmallBracket = [
    {
      id: 19753,
      nextMatchId: null,
      tournamentRoundText: "3",
      startTime: "2025-01-28",
      state: "SCHEDULED",
      participants: []
    },
    {
      id: 19754,
      nextMatchId: 19753,
      tournamentRoundText: "2",
      startTime: "2025-01-27",
      state: "SCHEDULED",
      participants: [
        {
          id: "14754a1a-932c-4992-8dec-f7f94a339960",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD",
          picture: "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      id: 19755,
      nextMatchId: 19754,
      tournamentRoundText: "1",
      startTime: "2025-01-26",
      state: "SCORE_DONE",
      participants: [
        {
          id: "14754a1a-932c-4992-8dec-f7f94a339960",
          resultText: "Won",
          isWinner: true,
          status: "PLAYED",
          name: "TBD",
          picture: "teamlogos/client_team_default_logo"
        },
        {
          id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
          resultText: "Lost",
          isWinner: false,
          status: "PLAYED",
          name: " TBD",
          picture: "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      id: 19756,
      nextMatchId: 19754,
      tournamentRoundText: "1",
      startTime: "2025-01-26",
      state: "RUNNING",
      participants: [
        {
          id: "d8b9f00a-0ffa-4527-8316-da701894768e",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD",
          picture: "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      id: 19757,
      nextMatchId: 19753,
      tournamentRoundText: "2",
      startTime: "2025-01-27",
      state: "SCHEDULED",
      participants: []
    },
    {
      id: 19758,
      nextMatchId: 19757,
      tournamentRoundText: "1",
      startTime: "2025-01-26",
      state: "SCHEDULED",
      participants: [
        {
          id: "9397971f-4b2f-44eb-a094-722eb286c59b",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD",
          picture: "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      id: 19759,
      nextMatchId: 19757,
      tournamentRoundText: "1",
      startTime: "2025-01-26",
      state: "SCHEDULED",
      participants: [
        {
          id: "42fecd89-dc83-4821-80d3-718acb50a30c",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD",
          picture: "teamlogos/client_team_default_logo"
        },
        {
          id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD",
          picture: "teamlogos/r7zn4gr8eajivapvjyzd"
        }
      ]
    }
  ];