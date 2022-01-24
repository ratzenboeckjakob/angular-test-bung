package at.htl;

import io.quarkus.runtime.StartupEvent;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

@ApplicationScoped
public class InitBean {

    @Inject
    Logger LOG;

    void init(@Observes StartupEvent event) {
        LOG.infof("************************************************");
        LOG.infof("* swagger: http://localhost:8080/q/swagger-ui/ *");
        LOG.infof("************************************************");
    }

}
