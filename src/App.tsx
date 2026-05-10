import 'braid-design-system/reset';
import {
  BraidProvider,
  Box,
  Card,
  Heading,
  Stack,
  Text,
  TextLink,
} from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';

export const App = () => (
  <BraidProvider theme={seekJobs}>
    <Box padding="gutter" style={{ maxWidth: 720, margin: '0 auto' }}>
      <Stack space="large">
        <Heading level="1">Prototype workspace spike</Heading>
        <Text>
          This page exists so we can prove that Cursor's in-app browser
          and element-selection workflow operate correctly against a
          dev server running inside a Lima VM.
        </Text>
        <Card>
          <Stack space="medium">
            <Heading level="3">Try this in Cursor</Heading>
            <Text>Ask the agent to change this Heading to "Welcome back".</Text>
            <TextLink href="https://seek-oss.github.io/braid-design-system">
              Braid documentation
            </TextLink>
          </Stack>
        </Card>
      </Stack>
    </Box>
  </BraidProvider>
);
