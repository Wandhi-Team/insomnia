import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { HandleGetRenderContext, HandleRender } from '../../../common/render';
import { Button } from '../base/button';
import { GRPCEditor } from '../editors/grpc-editor';

interface Message {
  id: string;
  created: number;
  text: string;
}

interface Props {
  messages?: Message[];
  tabNamePrefix: 'Stream' | 'Response';
  bodyText?: string;
  uniquenessKey: string;
  handleBodyChange?: (arg0: string) => Promise<void>;
  handleStream?: () => void;
  handleCommit?: () => void;
  showActions?: boolean;
  handleRender?: HandleRender;
  isVariableUncovered?: boolean;
  handleGetRenderContext?: HandleGetRenderContext;
}

export const GrpcTabbedMessages: FunctionComponent<Props> = ({
  showActions,
  bodyText,
  messages,
  tabNamePrefix,
  handleBodyChange,
  handleCommit,
  handleStream,
  uniquenessKey,
  handleRender,
  isVariableUncovered,
  handleGetRenderContext,
}) => {
  const shouldShowBody = !!handleBodyChange;
  const orderedMessages = messages?.sort((a, b) => a.created - b.created) || [];
  return (
    <Tabs key={uniquenessKey} className={classnames('react-tabs', 'react-tabs--nested')}>
      <div className="tab-action-wrapper">
        <div className="tab-action-tabs">
          <TabList>
            {shouldShowBody && (
              <Tab>
                <button>Body</button>
              </Tab>
            )}
            {messages?.map((m, index) => (
              <Tab key={m.id}>
                <button>
                  {tabNamePrefix} {index + 1}
                </button>
              </Tab>
            ))}
          </TabList>
        </div>
        {showActions && (
          <>
            {handleStream && (
              <Button
                className="btn btn--compact btn--clicky margin-sm bg-default"
                onClick={handleStream}
              >
                Stream <i className="fa fa-plus" />
              </Button>
            )}
            {handleCommit && (
              <Button
                className="btn btn--compact btn--clicky margin-sm bg-surprise"
                onClick={handleCommit}
              >
                Commit <i className="fa fa-arrow-right" />
              </Button>
            )}
          </>
        )}
      </div>
      {shouldShowBody && (
        <TabPanel className="react-tabs__tab-panel editor-wrapper">
          <GRPCEditor
            content={bodyText}
            handleChange={handleBodyChange}
            handleRender={handleRender}
            handleGetRenderContext={handleGetRenderContext}
            isVariableUncovered={isVariableUncovered}
          />
        </TabPanel>
      )}
      {orderedMessages.map(m => (
        <TabPanel key={m.id} className="react-tabs__tab-panel editor-wrapper">
          <GRPCEditor content={m.text} readOnly />
        </TabPanel>
      ))}
    </Tabs>
  );
};
