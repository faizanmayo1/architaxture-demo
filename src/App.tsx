import { Route, Switch } from "wouter";
import { Layout } from "./components/layout/Layout";
import { ClientHub } from "./pages/ClientHub";
import { MorningBriefing } from "./pages/MorningBriefing";
import { Forecasting } from "./pages/Forecasting";
import { TaxPlanning } from "./pages/TaxPlanning";
import { AugustaPlaybook } from "./pages/AugustaPlaybook";
import { ReviewQueue } from "./pages/ReviewQueue";
import { FirmOverview } from "./pages/FirmOverview";
import { ClientsList } from "./pages/ClientsList";
import { Documents } from "./pages/Documents";
import { Reports } from "./pages/Reports";
import { StrategyEngine } from "./pages/StrategyEngine";
import { Engagements } from "./pages/Engagements";
import { Settings } from "./pages/Settings";
import { ClientDocuments } from "./pages/ClientDocuments";
import { ClientEngagements } from "./pages/ClientEngagements";
import { ClientCommunications } from "./pages/ClientCommunications";
import { IRSNotices } from "./pages/IRSNotices";
import { IRSNoticeDetail } from "./pages/IRSNoticeDetail";
import { ClientPortal } from "./pages/ClientPortal";
import { Onboarding } from "./pages/Onboarding";
import { FormGeneration } from "./pages/FormGeneration";
import { Placeholder } from "./pages/Placeholder";

export default function App() {
  return (
    <Switch>
      {/* Client Portal — renders without firm-side Layout */}
      <Route path="/portal" component={ClientPortal} />
      <Route path="/portal/:rest*" component={ClientPortal} />

      {/* Everything else uses the firm Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={FirmOverview} />
            <Route path="/briefing" component={MorningBriefing} />
            <Route path="/clients" component={ClientsList} />
            <Route path="/clients/:id">
              {(params) => <ClientHub clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/forecast">
              {(params) => <Forecasting clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/tax-planning">
              {(params) => <TaxPlanning clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/strategies/augusta-rule">
              {(params) => <AugustaPlaybook clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/documents">
              {(params) => <ClientDocuments clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/engagements">
              {(params) => <ClientEngagements clientId={Number(params.id)} />}
            </Route>
            <Route path="/clients/:id/communications">
              {(params) => <ClientCommunications clientId={Number(params.id)} />}
            </Route>
            <Route path="/irs-notices" component={IRSNotices} />
            <Route path="/irs-notices/:id">
              {(params) => <IRSNoticeDetail noticeId={params.id} />}
            </Route>
            <Route path="/review-queue" component={ReviewQueue} />
            <Route path="/strategies" component={StrategyEngine} />
            <Route path="/documents" component={Documents} />
            <Route path="/engagements" component={Engagements} />
            <Route path="/reports" component={Reports} />
            <Route path="/settings" component={Settings} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/forms" component={FormGeneration} />
            <Route>
              <Placeholder title="Not found" subtitle="The page you were looking for doesn't exist yet." />
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
