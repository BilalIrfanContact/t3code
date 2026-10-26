import { useAtomValue } from "@effect/atom-react";
import type { EnvironmentId, ProviderDriverKind } from "@t3tools/contracts";
import { InfoIcon } from "lucide-react";

import { serverEnvironment } from "../../state/server";
import { Alert, AlertDescription } from "../ui/alert";

const MULTIPLE_ACCOUNTS_FAQ_URL =
  "https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider";

/** Shown while adding a Claude or Codex account when the environment already has one signed in. */
export function MultipleAccountsNote({
  environmentId,
  driver,
}: {
  readonly environmentId: EnvironmentId;
  readonly driver: ProviderDriverKind;
}) {
  const providers = useAtomValue(serverEnvironment.providersValueAtom(environmentId));
  const hasSignedInAccount =
    (driver === "codex" || driver === "claudeAgent") &&
    providers?.some(
      (provider) => provider.driver === driver && provider.auth.status === "authenticated",
    );
  if (!hasSignedInAccount) return null;
  return (
    <Alert variant="info" role="note">
      <InfoIcon aria-hidden />
      <AlertDescription>
        <p>
          We do not recommend managing multiple accounts together in T3 Code.{" "}
          <a
            href={MULTIPLE_ACCOUNTS_FAQ_URL}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            More info
          </a>
        </p>
      </AlertDescription>
    </Alert>
  );
}
